"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphQLServer = exports.handleErrors = void 0;
const graphql_1 = require("graphql");
const handleErrors = function (result, formatError) {
    if (formatError && result.errors) {
        result.errors = result.errors.map((err) => formatError(err));
    }
};
exports.handleErrors = handleErrors;
const graphQLServer = function (options) {
    return function (ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield (0, graphql_1.graphql)({
                    schema: options.schema,
                    source: ctx.request.body.query,
                    variableValues: ctx.request.body.variables,
                    contextValue: ctx,
                });
                ctx.body = result;
                (0, exports.handleErrors)(result, options.formatError);
            }
            catch (error) {
                if (!(error instanceof Error)) {
                    console.error(error);
                    ctx.status = 500;
                    return;
                }
                if (!(error instanceof graphql_1.GraphQLError)) {
                    console.error(error.message, error);
                    ctx.status = 500;
                    return;
                }
                ctx.status = 400;
                (0, exports.handleErrors)({ errors: [error] }, options.formatError);
            }
        });
    };
};
exports.graphQLServer = graphQLServer;
//# sourceMappingURL=index.js.map