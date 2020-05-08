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
const graphql_1 = require("graphql");
exports.handleErrors = function (result, formatError) {
    if (formatError && result.errors) {
        result.errors = result.errors.map((err) => formatError(err));
    }
};
exports.graphQLServer = function (options) {
    return function (ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield graphql_1.graphql(options.schema, ctx.request.body ? ctx.request.body.query : null, null, ctx, ctx.request.body ? ctx.request.body.variables || null : null);
                ctx.body = result;
                exports.handleErrors(result, options.formatError);
            }
            catch (error) {
                ctx.status = error.status || 500;
                exports.handleErrors({ errors: [error] }, options.formatError);
            }
        });
    };
};
//# sourceMappingURL=index.js.map