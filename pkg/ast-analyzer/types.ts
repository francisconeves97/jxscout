import { Position, Program } from "acorn";
import { AncestorVisitors } from "acorn-walk";

export interface AnalyzerMatch {
  filePath: string;
  analyzerName: string;
  value: string;
  start: Position;
  end: Position;
  tags: Record<string, true>;
}

export interface AnalyzerParams {
  ast: Program;
  source: string;
  filePath: string;
}

export type Analyzer = (
  params: AnalyzerParams,
  matchesReturn: AnalyzerMatch[]
) => AncestorVisitors<unknown>;
