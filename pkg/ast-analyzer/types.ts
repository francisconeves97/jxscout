import { Position, Program } from "acorn";
import { AncestorVisitors } from "acorn-walk";

export interface AnalyzerMatch {
  analyzerName: string;
  value: string;
  start: Position;
  end: Position;
  tags: Record<string, true>;
}

export interface AnalyzerParams {
  ast: Program;
  source: string;
}

export type Analyzer = (
  params: AnalyzerParams,
  matchesReturn: AnalyzerMatch[]
) => AncestorVisitors<unknown>;
