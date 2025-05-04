import { walk, Node as OxcNode } from "oxc-walker";

export interface Position {
  /** 1-based */
  line: number;
  /** 0-based */
  column: number;
}

// Define a type that includes the loc property
type NodeWithLoc = OxcNode & {
  loc: {
    start: Position;
    end: Position;
  };
};

type NodeType = OxcNode["type"];

type Visitor = {
  [K in NodeType]?: (
    node: Extract<NodeWithLoc, { type: K }>,
    ancestors: NodeWithLoc[]
  ) => void;
};

function getPosition(source: string, pos: number): Position {
  const lines = source.slice(0, pos).split("\n");
  const line = lines.length;
  const column = lines[lines.length - 1].length;
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

  // Add loc property to the node if it doesn't exist
  const nodeWithLoc = node as NodeWithLoc;
  if (!nodeWithLoc.loc) {
    nodeWithLoc.loc = {
      start: getPosition(sourceCode, node.start),
      end: getPosition(sourceCode, node.end),
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
            start: getPosition(sourceCode, node.start),
            end: getPosition(sourceCode, node.end),
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
