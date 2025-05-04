import { Position } from "acorn";
import { AncestorVisitors } from "acorn-walk";
import { Program } from "oxc-parser";

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
