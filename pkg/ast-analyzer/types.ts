import { Position, Program } from "acorn";
import { SimpleVisitors } from "acorn-walk";

export interface AnalyzerMatch {
  analyzerName: string;
  value: string;
  start: Position;
  end: Position;
}

export interface AnalyzerParams {
  ast: Program;
  source: string;
}

export type Analyzer = (
  params: AnalyzerParams,
  matchesReturn: AnalyzerMatch[]
) => SimpleVisitors<unknown>;
