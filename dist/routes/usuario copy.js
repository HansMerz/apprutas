"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const usuarios_1 = require("../controllers/usuarios");
const trpc_1 = require("../trpc");
const router = (0, express_1.Router)();
router.get('/', usuarios_1.getUsuarios);
router.get('/:id', usuarios_1.getUsuario);
router.post('/', usuarios_1.postUsuario);
router.put('/:id', usuarios_1.putUsuario);
router.delete('/:id', usuarios_1.deletetUsuario);
const getUser = trpc_1.publicProcedure.query(() => {
    return usuarios_1.getUsuarios;
});
exports.userRoutes = (0, trpc_1.router)({
    get: getUser
});
exports.default = router;
//# sourceMappingURL=usuario%20copy.js.map