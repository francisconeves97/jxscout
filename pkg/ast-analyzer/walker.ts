import { walk, Node as OxcNode } from "oxc-walker";

export interface Position {
  /** 1-based */
  line: number;
  /** 0-based */
  column: number;
}

// Define a type that includes the loc property
export type NodeWithLoc = OxcNode & {
  loc: {
    start: Position;
    end: Position;
  };
};

type NodeType = OxcNode["type"];

export type Visitor = {
  [K in NodeType]?: (
    node: Extract<NodeWithLoc, { type: K }>,
    ancestors: NodeWithLoc[]
  ) => void;
};

function getPosition(
  source: string,
  pos: number,
  lineOffsets: number[]
): Position {
  // Binary search to find the line number
  let low = 0;
  let high = lineOffsets.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (lineOffsets[mid] <= pos) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  const line = low;
  const column = pos - lineOffsets[line - 1];
  return { line, column };
}

/**
 * Walks the AST with ancestor tracking, similar to acorn-walk's ancestors
 * @param sourceCode The source code string
 * @param node The root node to start walking from
 * @param visitors Object containing visitor methods for different node types
 */
export function ancestors(
  sourceCode: string,
  node: OxcNode,
  visitors: Visitor
) {
  const ancestors: NodeWithLoc[] = [];

  // Precompute line offsets
  const lineOffsets: number[] = [0]; // First line starts at position 0
  for (let i = 0; i < sourceCode.length; i++) {
    if (sourceCode[i] === "\n") {
      lineOffsets.push(i + 1);
    }
  }
  lineOffsets.push(sourceCode.length + 1); // Add sentinel value

  // Add loc property to the node if it doesn't exist
  const nodeWithLoc = node as NodeWithLoc;
  if (!nodeWithLoc.loc) {
    nodeWithLoc.loc = {
      start: getPosition(sourceCode, node.start, lineOffsets),
      end: getPosition(sourceCode, node.end, lineOffsets),
    };
  }

  walk(node, {
    enter(node) {
      const type = node.type as string;
      const isNew = node !== ancestors[ancestors.length - 1];

      if (isNew) {
        // Add loc property to the node if it doesn't exist
        const nodeWithLoc = node as NodeWithLoc;
        if (!nodeWithLoc.loc) {
          nodeWithLoc.loc = {
            start: getPosition(sourceCode, node.start, lineOffsets),
            end: getPosition(sourceCode, node.end, lineOffsets),
          };
        }
        ancestors.push(nodeWithLoc);
      }

      // Call specific visitor if provided
      if (visitors[type]) {
        visitors[type](
          node as Extract<NodeWithLoc, { type: typeof type }>,
          ancestors
        );
      }
    },
    leave(node) {
      const isNew = node === ancestors[ancestors.length - 1];
      if (isNew) {
        ancestors.pop();
      }
    },
  });
}
