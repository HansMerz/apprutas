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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usuario_1 = __importDefault(require("../routes/usuario"));
const estudiante_1 = __importDefault(require("../routes/estudiante"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("../db/connection"));
//import * as trpcExpress from '@trpc/server/adapters/express';
//import { router,createContext } from '../trpc';
class Server {
    constructor() {
        //private appRouter;
        this.apiPaths = {
            usuarios: '/api/usuarios',
            estudiantes: '/api/estudiantes'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8000';
        /*this.appRouter = router({
            user: routesTrpc
        });*/
        this.dbConnection();
        this.middlewares();
        //this.trpcConfig();
        this.routes();
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log('Database online');
            }
            catch (error) {
                throw new Error("Error: " + error);
            }
        });
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.static('public'));
    }
    routes() {
        this.app.use(this.apiPaths.usuarios, usuario_1.default);
        this.app.use(this.apiPaths.estudiantes, estudiante_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running in port: ' + this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map