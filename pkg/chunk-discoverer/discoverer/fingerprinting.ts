import { Program } from "acorn";
import { is, NodePath, traverse } from "estree-toolkit";
import {
  AssignmentExpression,
  Expression,
  Function,
  FunctionDeclaration,
  Identifier,
  Node,
  VariableDeclarator,
} from "estree-toolkit/dist/generated/types";

const LOADING_CHUNK_FINGERPRINT = "Loading chunk ";

export interface ChunkLoadingFingerprintContext {
  functionContext: ChunkLoadingFunctionContext;
  expressionContext: ChunkBuilderExpressionContext;
}

export const identifyChunkLoadingFunctionAndExpression = (
  ast: Program
): ChunkLoadingFingerprintContext | undefined => {
  const chunkLoadingFunctionContext = findChunkLoadingFunction(ast);
  if (!chunkLoadingFunctionContext) {
    return;
  }

  const chunkBuilderExpression = findChunkBuilderExpression(
    chunkLoadingFunctionContext
  );
  if (!chunkBuilderExpression) {
    return;
  }

  return {
    functionContext: chunkLoadingFunctionContext,
    expressionContext: chunkBuilderExpression,
  };
};

interface ChunkLoadingFunctionContext {
  function: NodePath<Function>;
  chunkIdParam: NodePath<Identifier>;
}

const findChunkLoadingFunction = (
  ast: Program
): ChunkLoadingFunctionContext | undefined => {
  let context: ChunkLoadingFunctionContext | undefined;

  traverse(ast, {
    Literal(path) {
      if (path.node?.value !== LOADING_CHUNK_FINGERPRINT) {
        return;
      }

      let func: NodePath<Function> | null | undefined = path
        .getFunctionParent()
        ?.getFunctionParent(); // assuming the target function is the parent of the error handling function

      if (
        !is.assignmentExpression(func?.getOpposite()?.parentPath) &&
        !is.variableDeclarator(func?.parentPath)
      ) {
        return this.stop();
      }

      if (!func) {
        return this.stop();
      }

      const funcParams = func.get("params");

      // the function should have at least one param (chunkID)
      if (funcParams.length < 1) {
        return this.stop();
      }

      const chunkIdParam = funcParams[0];
      if (!is.identifier(chunkIdParam)) {
        return this.stop();
      }

      context = {
        function: func,
        chunkIdParam: chunkIdParam,
      };

      this.stop();
    },
  });

  return context;
};

interface ChunkBuilderExpressionContext {
  expression: NodePath<Expression> | undefined;
}

const findChunkBuilderExpression = (
  context: ChunkLoadingFunctionContext
): ChunkBuilderExpressionContext | undefined => {
  let chunkBuilderExpression: ChunkBuilderExpressionContext | undefined;

  // the chunk builder expression usually is within the context of a assignment (e.g. d.src = s(t)) or
  // variable declaration (var i = s(t)). let's look for those two places
  context.function.traverse({
    AssignmentExpression(path) {
      const right = path.get("right");

      if (
        matchesBinaryExpressionFingerprint(context, right) ||
        matchesCallExpressionFingerprint(context, right)
      ) {
        chunkBuilderExpression = {
          expression: right,
        };
        this.stop();
      }
    },
    VariableDeclarator(path) {
      const right: NodePath<Expression, VariableDeclarator> = path.get("init");

      if (
        matchesBinaryExpressionFingerprint(context, right) ||
        matchesCallExpressionFingerprint(context, right)
      ) {
        chunkBuilderExpression = {
          expression: right,
        };
        this.stop();
      }
    },
  });

  return chunkBuilderExpression;
};

const matchesBinaryExpressionFingerprint = (
  context: ChunkLoadingFunctionContext,
  expression: NodePath<Expression>
): boolean => {
  if (!is.binaryExpression(expression)) {
    return false;
  }

  const hasPlusOperator = expression.node?.operator === "+";
  if (!hasPlusOperator) {
    return false;
  }

  let hasCallWithChunkID = false;

  expression.traverse({
    CallExpression(path) {
      if (matchesCallExpressionFingerprint(context, path)) {
        hasCallWithChunkID = true;
        this.stop();
      }
    },
  });

  if (hasCallWithChunkID) {
    return true;
  }

  // if we don't have a function call here with chunkID, most likely the expression is inlined
  // so there will be two indicators for this scenario:
  // 1. the chunkID argument is used somewhere in the expression
  // 2. there is a literal somewhere that includes ".js"

  let hasChunkIDIdentifier = false;
  let hasJSLiteral = false;

  expression.traverse({
    Identifier(path) {
      if (path.node && path.node?.name === context.chunkIdParam.node?.name) {
        hasChunkIDIdentifier = true;
      }
    },
    Literal(path) {
      if (
        typeof path.node?.value === "string" &&
        path.node.value.includes(".js")
      ) {
        hasJSLiteral = true;
      }
    },
  });

  return hasJSLiteral && hasChunkIDIdentifier;
};

const matchesCallExpressionFingerprint = (
  context: ChunkLoadingFunctionContext,
  expression: NodePath<Expression>
): boolean => {
  if (!is.callExpression(expression)) {
    return false;
  }

  const args = expression.node?.arguments;
  if (args?.length !== 1) {
    return false;
  }

  if (!is.identifier(args[0])) {
    return false;
  }

  if (args[0].name !== context.chunkIdParam.node?.name) {
    return false;
  }

  return true;
};

const hasJSLiteral = (path: NodePath<Node>): boolean => {
  let hasJSLiteral = false;

  traverse(path.node, {
    Literal(path) {
      if (
        typeof path.node?.value === "string" &&
        path.node.value.includes(".js")
      ) {
        hasJSLiteral = true;
        this.stop();
      }
    },
  });

  return hasJSLiteral;
};

export const matchesHardcodedHashFunction = (
  path: NodePath<AssignmentExpression>,
  leftIdentifier: string,
  rightIdentifier: string
): boolean => {
  const left = path.get("left");
  if (
    is.memberExpression(left) &&
    is.identifier(left.node?.object) &&
    is.identifier(left.node?.property)
  ) {
    if (
      left.node.object.name !== leftIdentifier ||
      left.node.property.name !== rightIdentifier
    ) {
      return false; // it can't be the function we want to get the assignent from
    }
  } else {
    return false;
  }

  const right = path.get("right");
  if (is.functionExpression(right) || is.arrowFunctionExpression(right)) {
    if (right.node?.params.length !== 0) {
      return false;
    }

    return true;
  }

  return false;
};

export const matchesPropertyAssignChunkBuilderFunction = (
  path: NodePath<AssignmentExpression>,
  leftIdentifier: string,
  rightIdentifier: string
): boolean => {
  const left = path.get("left");
  if (
    is.memberExpression(left) &&
    is.identifier(left.node?.object) &&
    is.identifier(left.node?.property)
  ) {
    if (
      left.node.object.name !== leftIdentifier ||
      left.node.property.name !== rightIdentifier
    ) {
      return false; // it can't be the function we want to get the assignent from
    }
  } else {
    return false;
  }

  const right = path.get("right");
  if (is.functionExpression(right) || is.arrowFunctionExpression(right)) {
    if (right.node?.params.length !== 1) {
      return false;
    }

    return hasJSLiteral(right);
  }

  return false;
};

export const matchesFunctionDeclarationChunkBuilderFunction = (
  path: NodePath<FunctionDeclaration>,
  functionIdentifier: string
): boolean => {
  if (
    !is.identifier(path.node?.id) ||
    path.node.id.name !== functionIdentifier
  ) {
    return false;
  }

  if (path.node.params.length !== 1) {
    return false;
  }

  return hasJSLiteral(path);
};
