import express, {Application} from 'express';
import userRoutes, {userRoutes as routesTrpc} from '../routes/usuario';
import cors from 'cors';
import db from '../db/connection';
//import * as trpcExpress from '@trpc/server/adapters/express';
//import { router,createContext } from '../trpc';

class Server {

    private app: Application;
    private port: string;
    //private appRouter;
    private apiPaths = {
        usuarios: '/api/usuarios'
    }

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8000';
        /*this.appRouter = router({
            user: routesTrpc
        });*/
        this.dbConnection();
        this.middlewares();
        //this.trpcConfig();
        this.routes();
    }

    async dbConnection() {
        try {
            await db.authenticate();
            console.log('Database online');
        } catch (error) {
            throw new Error("Error: " + error);
        }
    }


    middlewares() {
        this.app.use(cors());

        this.app.use(express.json());

        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.apiPaths.usuarios, userRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running in port: ' + this.port);
        });
    }

    /*trpcConfig() {
        this.app.use('/trpc', trpcExpress.createExpressMiddleware({
            router: this.appRouter,
            createContext
        }));
    }

    exportAppRouter() {
        return typeof this.appRouter;
    }*/

}

export default Server;