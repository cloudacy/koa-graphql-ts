import { Context } from "koa";
import { GraphQLSchema, graphql, ExecutionResult, GraphQLError } from "graphql";

export type ErrorFunction = (
  error: GraphQLError,
  returnNull?: boolean | undefined
) => unknown;

export interface GraphQLServerOptions {
  schema: GraphQLSchema;
  rootValue?: unknown;
  ctx?: unknown;
  pretty?: boolean;
  formatError?: ErrorFunction;
  extensions?: () => unknown;
  validationRules?: {};
  fieldResolver?: unknown;
}

export const handleErrors = function (
  result: ExecutionResult,
  formatError?: ErrorFunction
) {
  if (formatError && result.errors) {
    result.errors = result.errors.map((err) => formatError(err)) as any;
  }
};

export const graphQLServer = function (options: GraphQLServerOptions) {
  return async function (
    ctx: Context & { request: { body: Record<string, unknown> } }
  ) {
    try {
      const result = await graphql({
        schema: options.schema,
        source: ctx.request.body.query as string,
        variableValues: ctx.request.body.variables as
          | Record<string, unknown>
          | undefined,
        contextValue: ctx,
      });
      ctx.body = result;
      handleErrors(result, options.formatError);
    } catch (error) {
      if (!(error instanceof Error)) {
        console.error(error);
        ctx.status = 500;
        return;
      }

      if (!(error instanceof GraphQLError)) {
        console.error(error.message, error);
        ctx.status = 500;
        return;
      }

      ctx.status = 400;
      handleErrors({ errors: [error] }, options.formatError);
    }
  };
};
