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
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield graphql_1.graphql(options.schema, ctx.request.body.query, null, ctx, ((_a = ctx.request.body) === null || _a === void 0 ? void 0 : _a.variables) || undefined);
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
exports.graphQLServer = graphQLServer;
//# sourceMappingURL=index.js.map