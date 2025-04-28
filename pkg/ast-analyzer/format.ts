import { PATHS_ANALYZER_NAME } from "./paths"
import { Analyzer, AnalyzerMatch } from "./types"

type TreeNode<T> = {
    label: string
    icon: string
    value: T
}

type ASTAnalyzerTreeV1 = {
    paths: {
        all: TreeNode<AnalyzerMatch[]>
        api: TreeNode<AnalyzerMatch[]>
        queryParams: TreeNode<AnalyzerMatch[]>
    };
}

const formatMatches = (matches: AnalyzerMatch[]): ASTAnalyzerTreeV1 => {

    const paths: ASTAnalyzerTreeV1["paths"] = {
        all:
    }
}

const formatPaths = (matches: AnalyzerMatch[]): ASTAnalyzerTreeV1["paths"] => {
    const paths: AnalyzerMatch[] = []
    const apiPaths: AnalyzerMatch[] = []
    const queryParams: AnalyzerMatch[] = []

    for (const match of matches) {
        if (match.analyzerName !== PATHS_ANALYZER_NAME) {
            continue
        }

        paths.push(match)

        if (match.value.includes('api')) {
            apiPaths.push(match)
        }

        if (match.value.includes('?')) {
            queryParams.push(match)
        }
    }

    return {
        all: {
            label: "All",
            icon: "tbd",
            value: paths
        },
        api: {
            label: "API",
            icon: "tbd",
            value: apiPaths,
        },
        queryParams: {
            label: "Query Params",
            icon: "tbd",
            value: queryParams
        }
    }
}