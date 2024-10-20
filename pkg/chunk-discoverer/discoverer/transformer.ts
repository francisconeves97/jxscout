import { Program } from "acorn";
import { generate } from "astring";
import { builders as b, is, NodePath, traverse } from "estree-toolkit";
import {
  CallExpression,
  Expression,
  ExpressionStatement,
  FunctionDeclaration,
  MemberExpression,
} from "estree-toolkit/dist/generated/types";
import {
  ChunkLoadingFingerprintContext,
  matchesFunctionDeclarationChunkBuilderFunction,
  matchesHardcodedHashFunction,
  matchesPropertyAssignChunkBuilderFunction,
} from "./fingerprinting";

export const getChunkFunctionCode = (
  context: ChunkLoadingFingerprintContext,
  ast: Program
): string | undefined => {
  let expressionNode: any = context.expressionContext.expression?.node;
  if (!expressionNode) {
    return;
  }

  const expressionToOptize = b.blockStatement([
    b.expressionStatement(expressionNode),
  ]);

  let foundOptimization: boolean;
  do {
    foundOptimization = false;

    // add a root node in case there is no parent
    traverse(expressionToOptize, {
      MemberExpression(path) {
        if (simplifyMemberExpression(path)) {
          foundOptimization = true;
          this.stop();
        }
      },
      CallExpression(path) {
        if (simplifyCallExpression(path, ast)) {
          foundOptimization = true;
          this.stop();
        }
      },
    });
  } while (foundOptimization);

  if (!context.functionContext.function.node) {
    return;
  }

  const originalExpression = expressionToOptize.body[0] as ExpressionStatement;

  // returns the code for the new function
  return generate(
    b.arrowFunctionExpression(
      [context.functionContext.function.node.params[0]],
      b.blockStatement([b.returnStatement(originalExpression.expression)])
    )
  );
};

const simplifyMemberExpression = (
  expression: NodePath<MemberExpression>
): boolean => {
  let simplified = false;

  const simplify = () => {
    expression.replaceWith(b.literal("")); // replacing with an empty string
    simplified = true;
  };

  if (
    is.memberExpression(expression) &&
    is.identifier(expression.node?.object) &&
    is.identifier(expression.node?.property)
  ) {
    if (is.callExpression(expression.parent)) {
      if (expression.parent.callee === expression.node) {
        return false;
      } else {
        simplify();
        return true;
      }
    }

    simplify();
    return true;
  }

  return simplified;
};

export const simplifyCallExpression = (
  expression: NodePath<CallExpression>,
  ast: Program
): boolean => {
  if (simplifyMemberExpressionCall(expression, ast)) {
    return true;
  }

  return simplifyFunctionCall(expression, ast);
};

const simplifyMemberExpressionCall = (
  expression: NodePath<CallExpression>,
  ast: Program
): boolean => {
  const callee = expression.node?.callee;
  if (!is.memberExpression(callee)) {
    return false; // can't simplify
  }

  if (!is.identifier(callee.object)) {
    return false;
  }

  if (!is.identifier(callee.property)) {
    return false;
  }

  const leftIdentifier = callee.object;
  const rightIdentifier = callee.property;

  let functionExpression: NodePath<Expression> | undefined;

  traverse(ast, {
    AssignmentExpression(path) {
      if (
        matchesPropertyAssignChunkBuilderFunction(
          path,
          leftIdentifier.name,
          rightIdentifier.name
        )
      ) {
        functionExpression = path.get("right") as any;
        this.stop();
      }

      if (
        matchesHardcodedHashFunction(
          path,
          leftIdentifier.name,
          rightIdentifier.name
        )
      ) {
        functionExpression = path.get("right") as any;
        this.stop();
      }
    },
  });

  if (!functionExpression?.node) {
    return false;
  }

  if (expression.node?.arguments.length === 1) {
    // we found the chunk function, now it's time to replace the original call with this one
    expression.replaceWith(
      b.callExpression(functionExpression.node, expression.node?.arguments)
    );
    return true;
  }

  if (expression.node?.arguments.length === 0) {
    // we found the chunk function, now it's time to replace the original call with this one
    expression.replaceWith(b.callExpression(functionExpression.node, []));
    return true;
  }

  return false;
};

const simplifyFunctionCall = (
  expression: NodePath<CallExpression>,
  ast: Program
): boolean => {
  const callee = expression.node?.callee;
  if (!is.identifier(callee)) {
    return false; // can't simplify
  }

  const identifier = callee.name;

  let functionDeclaration: NodePath<FunctionDeclaration> | undefined;

  traverse(ast, {
    FunctionDeclaration(path) {
      if (matchesFunctionDeclarationChunkBuilderFunction(path, identifier)) {
        functionDeclaration = path;
        this.stop();
      }
    },
  });

  if (!functionDeclaration?.node) {
    return false;
  }

  if (expression.node?.arguments.length !== 1) {
    return false;
  }

  // we found the chunk function, now it's time to replace the original call with this one
  expression.replaceWith(
    b.callExpression(
      b.functionExpression(
        functionDeclaration.node.id,
        functionDeclaration.node.params,
        functionDeclaration.node.body
      ),
      expression.node?.arguments
    )
  );

  return true;
};
