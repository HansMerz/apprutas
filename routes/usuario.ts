import {Router} from 'express';
import { deletetUsuario, getUsuario, getUsuarios, postUsuario, putUsuario } from '../controllers/usuarios';
import { publicProcedure, router as routerTrpc } from '../trpc';

const router = Router();

router.get('/', getUsuarios);
router.get('/:id', getUsuario);
router.post('/', postUsuario);
router.put('/:id', putUsuario);
router.delete('/:id', deletetUsuario);


const getUser = publicProcedure.query(() => {
    return getUsuarios;
});

export const userRoutes = routerTrpc({
    get: getUser
});

export default router;