import { ParameterizedContext, Request } from "koa";
import { GraphQLSchema, ExecutionResult } from "graphql";
export declare type ErrorFunction = (error: any, returnNull?: boolean | undefined) => any;
export interface GraphQLServerOptions {
    schema: GraphQLSchema;
    rootValue?: any;
    ctx?: any;
    pretty?: boolean;
    formatError?: ErrorFunction;
    extensions?: () => any;
    validationRules?: {};
    fieldResolver?: any;
}
export interface ExtendedRequest extends Request {
    body?: Record<string, any> | null | undefined;
}
export interface ExtendedParameterizedContext extends ParameterizedContext {
    request: ExtendedRequest;
}
export declare const handleErrors: (result: ExecutionResult, formatError?: ErrorFunction | undefined) => void;
export declare const graphQLServer: (options: GraphQLServerOptions) => (ctx: ExtendedParameterizedContext) => Promise<void>;
