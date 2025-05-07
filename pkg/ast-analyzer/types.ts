import { Position } from "acorn";
import { Program } from "oxc-parser";
import { Visitor } from "./walker";

export interface AnalyzerMatch {
  filePath: string;
  analyzerName: string;
  value: string;
  start: Position;
  end: Position;
  tags: Record<string, true>;
  extra?: Record<string, any>;
}

export interface AnalyzerParams {
  ast: Program;
  source: string;
  filePath: string;
}

export type Analyzer = (
  params: AnalyzerParams,
  matchesReturn: AnalyzerMatch[]
) => Visitor;
