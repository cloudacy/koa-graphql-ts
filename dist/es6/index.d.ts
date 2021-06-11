import { Context } from "koa";
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
export declare const handleErrors: (result: ExecutionResult, formatError?: ErrorFunction | undefined) => void;
export declare const graphQLServer: (options: GraphQLServerOptions) => (ctx: Context & {
    request: {
        body: Record<string, unknown>;
    };
}) => Promise<void>;
