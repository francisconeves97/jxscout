import { Position, Program } from "acorn";

export interface AnalyzerMatch {
  value: string;
  start: Position;
  end: Position;
}

export interface AnalyzerParams {
  ast: Program;
  source: string;
}

export type Analyzer = (params: AnalyzerParams) => AnalyzerMatch[];
