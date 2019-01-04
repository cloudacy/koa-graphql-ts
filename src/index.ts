import { ParameterizedContext, Request } from "koa";
import { GraphQLSchema, graphql } from "graphql";
import { renderGraphiQL } from "./graphiql";
import { ExecutionResultDataDefault } from "graphql/execution/execute";

export type ErrorFunction = (error: any, returnNull?: boolean | undefined) => any

export interface GraphQLServerOptions {
  schema: GraphQLSchema
  graphiql?: boolean
  rootValue?: any
  ctx?: any
  pretty?: boolean
  formatError?: ErrorFunction
  extensions?: (() => any)
  validationRules?: {}
  fieldResolver?: any
}

export interface ExtendedRequest extends Request {
  body?: Record<string, any> | null | undefined;
}

export interface ExtendedParameterizedContext extends ParameterizedContext {
  request: ExtendedRequest
}

export const handleErrors = function(result: ExecutionResultDataDefault, formatError?: ErrorFunction) {
  if (formatError && result.errors) {
    result.errors = result.errors.map((err: Error) => formatError(err))
  }
}

export const graphQLServer = function(options: GraphQLServerOptions) {
  return async function(ctx: ExtendedParameterizedContext, next: () => Promise<void>) {
    if (options.graphiql) {
      ctx.type = 'text/html'
      ctx.status = 200
      ctx.body = renderGraphiQL({})
    } else {
      try {
        const result = await graphql(options.schema, ctx.request.body ? ctx.request.body.query : null, null, ctx, ctx.request.body ? ctx.request.body.variables || null : null)
        ctx.body = result
        handleErrors(result, options.formatError)
      } catch (error) {
        ctx.status = error.status || 500
        handleErrors({errors: [error]}, options.formatError)
      }
    }
  }
}