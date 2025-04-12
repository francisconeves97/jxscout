package overrides

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"log/slog"
	"net/http"
	"time"

	"github.com/francisconeves97/jxscout/internal/core/errutil"
	"github.com/hasura/go-graphql-client"
)

// authenticatedTransport adds the authorization header to requests
type authenticatedTransport struct {
	token string
}

func (t *authenticatedTransport) RoundTrip(req *http.Request) (*http.Response, error) {
	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", t.token))
	return http.DefaultTransport.RoundTrip(req)
}

// CaidoClient manages communication with the Caido GraphQL API
type CaidoClient struct {
	client    *graphql.Client
	transport *authenticatedTransport
	url       string
	log       *slog.Logger
}

// NewCaidoClient creates a new Caido API client
func NewCaidoClient(hostname string, port int, log *slog.Logger) (*CaidoClient, error) {
	caidoURL := fmt.Sprintf("%s:%d", hostname, port)

	transport := &authenticatedTransport{}

	httpClient := &http.Client{
		Transport: transport,
	}

	client := graphql.NewClient(fmt.Sprintf("http://%s/graphql", caidoURL), httpClient)

	return &CaidoClient{
		client:    client,
		transport: transport,
		url:       caidoURL,
		log:       log,
	}, nil
}

func (c *CaidoClient) IsAuthenticated() bool {
	return c.transport.token != ""
}

// AuthenticationRequest represents the response from startAuthenticationFlow
type AuthenticationRequest struct {
	ID              string `graphql:"id"`
	ExpiresAt       string `graphql:"expiresAt"`
	UserCode        string `graphql:"userCode"`
	VerificationURL string `graphql:"verificationUrl"`
}

// AuthenticationResponse represents the response from the authentication subscription
type AuthenticationResponse struct {
	AuthenticationFlow struct {
		Token string `graphql:"token"`
	} `graphql:"authenticationFlow"`
}

func (c *CaidoClient) Authenticate(ctx context.Context, authCompleteChan chan<- bool) (string, error) {
	var mutation struct {
		StartAuthenticationFlow struct {
			Request AuthenticationRequest `graphql:"request"`
		} `graphql:"startAuthenticationFlow"`
	}

	err := c.client.Mutate(ctx, &mutation, nil)
	if err != nil {
		return "", errutil.Wrap(err, "failed to start authentication flow")
	}

	if mutation.StartAuthenticationFlow.Request.VerificationURL == "" {
		return "", errors.New("failed to start authentication flow")
	}

	// Create a channel to signal when the subscription is ready
	readyChan := make(chan error, 1)

	// Start listening for the authentication token in a goroutine
	go c.listenForAuthenticationToken(ctx, mutation.StartAuthenticationFlow.Request.ID, readyChan, authCompleteChan)

	// Wait for the subscription to be ready or context to be cancelled
	select {
	case err := <-readyChan:
		if err != nil {
			return "", errutil.Wrap(err, "failed to start authentication subscription")
		}
	case <-ctx.Done():
		return "", ctx.Err()
	}

	return mutation.StartAuthenticationFlow.Request.VerificationURL, nil
}

type CreatedAuthenticationToken struct {
	CreatedAuthenticationToken struct {
		Token struct {
			AccessToken string `graphql:"accessToken"`
		} `graphql:"token"`
	} `graphql:"createdAuthenticationToken(requestId: $requestId)"`
}

// listenForAuthenticationToken starts a subscription to listen for the authentication token
func (c *CaidoClient) listenForAuthenticationToken(ctx context.Context, requestID string, readyChan chan<- error, authCompleteChan chan<- bool) {
	subscriptionClient := graphql.NewSubscriptionClient(fmt.Sprintf("ws://%s/ws/graphql", c.url))
	defer subscriptionClient.Close()

	authChan := make(chan string, 1)
	errChan := make(chan error, 1)

	var subscription CreatedAuthenticationToken

	variables := map[string]interface{}{
		"requestId": requestID,
	}

	subscriptionID, err := subscriptionClient.Subscribe(&subscription, variables, func(data []byte, err error) error {
		if err != nil {
			errChan <- err
			return nil
		}

		var response CreatedAuthenticationToken
		if err := json.Unmarshal(data, &response); err != nil {
			errChan <- err
			return nil
		}

		if response.CreatedAuthenticationToken.Token.AccessToken != "" {
			authChan <- response.CreatedAuthenticationToken.Token.AccessToken
			c.log.Info("caido authentication successful")

			// Signal authentication completion if channel is provided
			if authCompleteChan != nil {
				authCompleteChan <- true
			}

			return graphql.ErrSubscriptionStopped
		}

		errChan <- errors.New("no authentication token received")

		return nil
	})
	if err != nil {
		c.log.Error("failed to start authentication subscription", "error", err)
		readyChan <- err
		return
	}

	// Start the subscription client
	go func() {
		if err := subscriptionClient.Run(); err != nil {
			errChan <- err
		}
	}()

	// Signal that the subscription is ready
	readyChan <- nil

	// Create a timeout context
	timeoutCtx, cancel := context.WithTimeout(ctx, time.Minute)
	defer cancel()

	// Wait for either authentication success, error, or timeout
	select {
	case token := <-authChan:
		subscriptionClient.Unsubscribe(subscriptionID)
		c.transport.token = token
	case err := <-errChan:
		subscriptionClient.Unsubscribe(subscriptionID)
		c.log.Error("authentication subscription error", "error", err)
	case <-timeoutCtx.Done():
		subscriptionClient.Unsubscribe(subscriptionID)
		c.log.Error("caido authentication timeout")
	}
}

// TamperRuleCollection represents a collection of tamper rules
type TamperRuleCollection struct {
	ID   string `graphql:"id"`
	Name string `graphql:"name"`
}

// GetTamperRuleCollections retrieves all tamper rule collections
func (c *CaidoClient) GetTamperRuleCollections(ctx context.Context) ([]TamperRuleCollection, error) {
	var query struct {
		TamperRuleCollections []TamperRuleCollection `graphql:"tamperRuleCollections"`
	}

	err := c.client.Query(ctx, &query, nil)
	if err != nil {
		return nil, errutil.Wrap(err, "failed to execute GraphQL query")
	}

	return query.TamperRuleCollections, nil
}

// CreateTamperRuleCollectionInput represents the input for creating a tamper rule collection
type CreateTamperRuleCollectionInput struct {
	Name string `json:"name"`
}

// CreateTamperRuleCollectionResponse represents the response from creating a tamper rule collection
type CreateTamperRuleCollectionResponse struct {
	Collection TamperRuleCollection `graphql:"collection"`
}

// CreateTamperRuleCollection creates a new tamper rule collection
func (c *CaidoClient) CreateTamperRuleCollection(ctx context.Context, name string) (TamperRuleCollection, error) {
	var mutation struct {
		CreateTamperRuleCollection struct {
			Collection TamperRuleCollection `graphql:"collection"`
		} `graphql:"createTamperRuleCollection(input: { name: $name })"`
	}

	variables := map[string]interface{}{
		"name": name,
	}

	err := c.client.Mutate(ctx, &mutation, variables)
	if err != nil {
		return TamperRuleCollection{}, errutil.Wrap(err, "failed to create tamper rule collection")
	}

	return mutation.CreateTamperRuleCollection.Collection, nil
}

// TamperRule represents a tamper rule in Caido
type TamperRule struct {
	ID   string `graphql:"id"`
	Name string `graphql:"name"`
}

// CreateTamperRuleInput represents the input for creating a tamper rule
type CreateTamperRuleInput struct {
	CollectionID string            `json:"collectionId"`
	Name         string            `json:"name"`
	Section      TamperRuleSection `json:"section"`
}

// TamperRuleSection represents the section of a tamper rule
type TamperRuleSection struct {
	ResponseBody TamperRuleResponseBody `json:"responseBody"`
}

// TamperRuleResponseBody represents the response body section of a tamper rule
type TamperRuleResponseBody struct {
	Operation TamperRuleOperation `json:"operation"`
}

// TamperRuleOperation represents the operation of a tamper rule
type TamperRuleOperation struct {
	Raw TamperRuleRaw `json:"raw"`
}

// TamperRuleRaw represents the raw operation of a tamper rule
type TamperRuleRaw struct {
	Matcher  TamperRuleMatcher  `json:"matcher"`
	Replacer TamperRuleReplacer `json:"replacer"`
}

// TamperRuleMatcher represents the matcher of a tamper rule
type TamperRuleMatcher struct {
	Full TamperRuleFull `json:"full"`
}

// TamperRuleFull represents the full matcher of a tamper rule
type TamperRuleFull struct {
	Full bool `json:"full"`
}

// TamperRuleReplacer represents the replacer of a tamper rule
type TamperRuleReplacer struct {
	Term TamperRuleTerm `json:"term"`
}

// TamperRuleTerm represents the term replacer of a tamper rule
type TamperRuleTerm struct {
	Term string `json:"term"`
}

// CreateTamperRule creates a new tamper rule
func (c *CaidoClient) CreateTamperRule(ctx context.Context, collectionID string, name string, content string, host string, path string) (TamperRule, error) {
	var mutation struct {
		CreateTamperRule struct {
			Rule struct {
				ID   string `graphql:"id"`
				Name string `graphql:"name"`
			} `graphql:"rule"`
		} `graphql:"createTamperRule(input: { collectionId: $collectionId, name: $name, condition: $condition, section: { responseBody: { operation: { raw: { matcher: { full: { full: true } }, replacer: { term: { term: $content } } } } } } })"`
	}

	condition := fmt.Sprintf(`req.host.cont:"%s" and req.path.cont:"%s"`, host, path)

	variables := map[string]interface{}{
		"collectionId": collectionID,
		"name":         name,
		"content":      content,
		"condition":    condition,
	}

	err := c.client.Mutate(ctx, &mutation, variables)
	if err != nil {
		return TamperRule{}, errutil.Wrap(err, "failed to create tamper rule")
	}

	return TamperRule{
		ID:   mutation.CreateTamperRule.Rule.ID,
		Name: mutation.CreateTamperRule.Rule.Name,
	}, nil
}

// ToggleTamperRule enables or disables a tamper rule
func (c *CaidoClient) ToggleTamperRule(ctx context.Context, ruleID string, enabled bool) (TamperRule, error) {
	var mutation struct {
		ToggleTamperRule struct {
			Rule struct {
				ID string `graphql:"id"`
			} `graphql:"rule"`
		} `graphql:"toggleTamperRule(id: $id, enabled: $enabled)"`
	}

	variables := map[string]interface{}{
		"id":      ruleID,
		"enabled": enabled,
	}

	err := c.client.Mutate(ctx, &mutation, variables)
	if err != nil {
		return TamperRule{}, errutil.Wrap(err, "failed to toggle tamper rule")
	}

	return TamperRule{
		ID: mutation.ToggleTamperRule.Rule.ID,
	}, nil
}

// DeleteTamperRule deletes a tamper rule
func (c *CaidoClient) DeleteTamperRule(ctx context.Context, ruleID string) (string, error) {
	var mutation struct {
		DeleteTamperRule struct {
			DeletedID string `graphql:"deletedId"`
		} `graphql:"deleteTamperRule(id: $id)"`
	}

	variables := map[string]interface{}{
		"id": ruleID,
	}

	err := c.client.Mutate(ctx, &mutation, variables)
	if err != nil {
		return "", errutil.Wrap(err, "failed to delete tamper rule")
	}

	return mutation.DeleteTamperRule.DeletedID, nil
}

// UpdateTamperRule updates an existing tamper rule
func (c *CaidoClient) UpdateTamperRule(ctx context.Context, ruleID string, name string, content string, host string, path string) (TamperRule, error) {
	var mutation struct {
		UpdateTamperRule struct {
			Rule struct {
				ID   string `graphql:"id"`
				Name string `graphql:"name"`
			} `graphql:"rule"`
		} `graphql:"updateTamperRule(id: $id, input: { name: $name, condition: $condition, section: { responseBody: { operation: { raw: { matcher: { full: { full: true } }, replacer: { term: { term: $content } } } } } } })"`
	}

	condition := fmt.Sprintf(`req.host.cont:"%s" and req.path.cont:"%s"`, host, path)
	if path == "" {
		condition = fmt.Sprintf(`req.host.cont:"%s" and req.path.eq:"/"`, host)
	}

	variables := map[string]interface{}{
		"id":        ruleID,
		"name":      name,
		"content":   content,
		"condition": condition,
	}

	err := c.client.Mutate(ctx, &mutation, variables)
	if err != nil {
		return TamperRule{}, errutil.Wrap(err, "failed to update tamper rule")
	}

	return TamperRule{
		ID:   mutation.UpdateTamperRule.Rule.ID,
		Name: mutation.UpdateTamperRule.Rule.Name,
	}, nil
}
