"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicProcedure = exports.middleware = exports.router = exports.createContext = void 0;
const server_1 = require("@trpc/server");
const createContext = () => ({ req, res }) => ({});
exports.createContext = createContext;
const t = server_1.initTRPC.context().create();
exports.router = t.router;
exports.middleware = t.middleware;
exports.publicProcedure = t.procedure;
//# sourceMappingURL=trpc.js.map