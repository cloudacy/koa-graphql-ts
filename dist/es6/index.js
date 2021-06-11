var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { graphql } from "graphql";
export const handleErrors = function (result, formatError) {
    if (formatError && result.errors) {
        result.errors = result.errors.map((err) => formatError(err));
    }
};
export const graphQLServer = function (options) {
    return function (ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield graphql(options.schema, ctx.request.body.query, null, ctx, ctx.request.body.variables || undefined);
                ctx.body = result;
                handleErrors(result, options.formatError);
            }
            catch (error) {
                ctx.status = error.status || 500;
                handleErrors({ errors: [error] }, options.formatError);
            }
        });
    };
};
//# sourceMappingURL=index.js.map