var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { graphql, GraphQLError } from "graphql";
export const handleErrors = function (result, formatError) {
    if (formatError && result.errors) {
        result.errors = result.errors.map((err) => formatError(err));
    }
};
export const graphQLServer = function (options) {
    return function (ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield graphql({
                    schema: options.schema,
                    source: ctx.request.body.query,
                    variableValues: ctx.request.body.variables,
                    contextValue: ctx,
                });
                ctx.body = result;
                handleErrors(result, options.formatError);
            }
            catch (error) {
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
        });
    };
};
//# sourceMappingURL=index.js.map