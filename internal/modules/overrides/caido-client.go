package overrides

import (
	"context"
	"fmt"
	"net/http"

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
}

// NewCaidoClient creates a new Caido API client
func NewCaidoClient(hostname string, port int) (*CaidoClient, error) {
	graphqlEndpoint := fmt.Sprintf("http://%s:%d/graphql", hostname, port)

	transport := &authenticatedTransport{}

	httpClient := &http.Client{
		Transport: transport,
	}

	client := graphql.NewClient(graphqlEndpoint, httpClient)

	return &CaidoClient{
		client:    client,
		transport: transport,
	}, nil
}

func (c *CaidoClient) IsAuthenticated() bool {
	return c.transport.token != ""
}

// AuthenticationRequest represents the response from startAuthenticationFlow
type AuthenticationRequest struct {
	ID              string `json:"id"`
	ExpiresAt       string `json:"expiresAt"`
	UserCode        string `json:"userCode"`
	VerificationURL string `json:"verificationUrl"`
}

func (c *CaidoClient) Authenticate(ctx context.Context) (string, error) {
	var mutation struct {
		StartAuthenticationFlow struct {
			Request AuthenticationRequest `json:"request"`
		} `json:"startAuthenticationFlow"`
	}

	err := c.client.Mutate(ctx, &mutation, nil)
	if err != nil {
		return "", errutil.Wrap(err, "failed to start authentication flow")
	}

	return mutation.StartAuthenticationFlow.Request.VerificationURL, nil
}

// TamperRuleCollection represents a collection of tamper rules
type TamperRuleCollection struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

// GetTamperRuleCollections retrieves all tamper rule collections
func (c *CaidoClient) GetTamperRuleCollections(ctx context.Context) ([]TamperRuleCollection, error) {
	var query struct {
		TamperRuleCollections []TamperRuleCollection `json:"tamperRuleCollections"`
	}

	err := c.client.Query(ctx, &query, nil)
	if err != nil {
		return nil, errutil.Wrap(err, "failed to execute GraphQL query")
	}

	return query.TamperRuleCollections, nil
}
