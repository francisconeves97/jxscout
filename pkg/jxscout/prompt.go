package jxscout

import (
	"fmt"
	"os"
	"path"
	"strings"

	"github.com/c-bata/go-prompt"
	"github.com/francisconeves97/jxscout/internal/core/common"
)

const (
	CommandExit       = "exit"
	CommandSetScope   = "set-scope"
	CommandSetProject = "set-project"
)

func (s *jxscout) promptCompleter(d prompt.Document) []prompt.Suggest {
	suggest := []prompt.Suggest{
		{Text: CommandExit},
		{Text: CommandSetScope},
		{Text: CommandSetProject},
	}

	return prompt.FilterHasPrefix(suggest, d.GetWordBeforeCursor(), true)
}

func (s *jxscout) promptExecutor(input string) {
	input = strings.TrimSpace(input)

	blocks := strings.Split(input, " ")

	switch blocks[0] {
	case CommandExit:
		os.Exit(0)
	case CommandSetScope:
		scopeRegex := initializeScope(strings.Split(blocks[1], ","))
		s.modulesSDK.Scope = newScopeChecker(scopeRegex)
	case CommandSetProject:
		newProjectName := blocks[1]
		s.modulesSDK.Options.ProjectName = newProjectName
		newProjectPath := path.Join(common.GetWorkingDirectory(), newProjectName)
		s.assetService.UpdateWorkingDirectory(newProjectPath)
	default:
		s.log.Warn(fmt.Sprintf("command %s not found", input))
	}
}

func (s *jxscout) runPrompt() {
	p := prompt.New(
		s.promptExecutor,
		s.promptCompleter,
		prompt.OptionPrefix(">>> "),
		prompt.OptionSuggestionTextColor(prompt.DefaultColor),
		prompt.OptionSuggestionBGColor(prompt.DefaultColor),
		prompt.OptionScrollbarBGColor(prompt.DefaultColor),
	)
	p.Run()
}
