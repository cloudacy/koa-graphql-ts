import { ParameterizedContext, Request } from "koa";
import { GraphQLSchema, ExecutionResult, GraphQLError } from "graphql";
export declare type ErrorFunction = (error: GraphQLError, returnNull?: boolean | undefined) => unknown;
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
export interface ExtendedRequest extends Request {
    body?: Record<string, unknown>;
}
export interface ExtendedParameterizedContext extends ParameterizedContext {
    request: ExtendedRequest;
}
export declare const handleErrors: (result: ExecutionResult, formatError?: ErrorFunction | undefined) => void;
export declare const graphQLServer: (options: GraphQLServerOptions) => (ctx: ExtendedParameterizedContext) => Promise<void>;
