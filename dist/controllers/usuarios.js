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
exports.deleteUser = exports.updateUser = exports.saveUser = exports.existEmail = exports.deletetUsuario = exports.putUsuario = exports.postUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuario_1.default.findAll();
    res.json({ usuarios });
});
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuario_1.default.findByPk(id);
    if (usuario) {
        res.json({ usuario });
    }
    else {
        res.status(404).json({
            msg: 'Usuario no encontrado'
        });
    }
});
exports.getUsuario = getUsuario;
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const emailExist = yield usuario_1.default.findOne({
            where: {
                email: body.email
            }
        });
        if (emailExist) {
            return res.status(400).json({
                msg: 'Ya existe un usuario con el email: ' + body.email
            });
        }
        const usuario = yield saveUser(body);
        res.json(usuario);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al crear el usuario'
        });
    }
});
exports.postUsuario = postUsuario;
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const usuario = yield updateUser(id, body);
        if (!usuario) {
            return res.status(404).json({
                msg: 'No existe el usuario con el id: ' + id
            });
        }
        res.json(usuario);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al actualizar el usuario'
        });
    }
});
exports.putUsuario = putUsuario;
const deletetUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield deleteUser(id);
    if (!usuario) {
        return res.status(404).json({
            msg: 'No existe el usuario con el id: ' + id
        });
    }
    res.json(usuario);
});
exports.deletetUsuario = deletetUsuario;
function existEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const emailExist = yield usuario_1.default.findOne({
            where: {
                email: email
            }
        });
        if (emailExist) {
            return true;
        }
        return false;
    });
}
exports.existEmail = existEmail;
function saveUser(body) {
    return __awaiter(this, void 0, void 0, function* () {
        const usuario = yield usuario_1.default.create(body);
        return usuario;
    });
}
exports.saveUser = saveUser;
function updateUser(id, body) {
    return __awaiter(this, void 0, void 0, function* () {
        const usuario = yield usuario_1.default.findByPk(id);
        if (!usuario) {
            return false;
        }
        yield usuario.update(body);
        return usuario;
    });
}
exports.updateUser = updateUser;
function deleteUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const usuario = yield usuario_1.default.findByPk(id);
        if (!usuario) {
            return false;
        }
        yield usuario.update({
            estado: false
        });
        return usuario;
    });
}
exports.deleteUser = deleteUser;
//# sourceMappingURL=usuarios.js.map