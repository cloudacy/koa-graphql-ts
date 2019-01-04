import { ParameterizedContext, Request } from "koa";
import { GraphQLSchema, graphql } from "graphql";
import { renderGraphiQL } from "./graphiql";

export interface GraphQLServerOptions {
  schema: GraphQLSchema
  graphiql?: boolean
  rootValue?: any
  ctx?: any
  pretty?: boolean
  formatError?: (error: any, returnNull?: boolean | undefined) => any
  extensions?: (() => any)
  validationRules?: {}
  fieldResolver?: any
}

export interface ExtendedRequest extends Request {
  body: Record<string, any> | null | undefined;
  rawBody: Record<string, any> | null | undefined;
}

export interface ExtendedParameterizedContext extends ParameterizedContext {
  request: ExtendedRequest
}

export const graphQLServer = function(options: GraphQLServerOptions) {
  return async function(ctx: ExtendedParameterizedContext, next: () => Promise<void>) {

    if (options.graphiql) {
      ctx.type = 'text/html'
      ctx.status = 200
      ctx.body = renderGraphiQL({})
    } else {
      ctx.body = await graphql(options.schema, ctx.request.body ? ctx.request.body.query : null, null, ctx, ctx.request.body ? ctx.request.body.variables || null : null)
    }
  }
}