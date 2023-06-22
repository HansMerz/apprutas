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
exports.getEstudianteById = exports.deleteEstudiante = exports.putEstudiante = exports.postEstudiante = exports.getEstudiante = exports.getEstudiantes = void 0;
const estudiante_1 = __importDefault(require("../models/estudiante"));
const usuario_1 = __importDefault(require("../models/usuario"));
const usuarios_1 = require("../controllers/usuarios");
const getEstudiantes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const estudiantes = yield estudiante_1.default.findAll({
        include: {
            model: usuario_1.default
        }
    });
    res.json({ estudiantes });
});
exports.getEstudiantes = getEstudiantes;
const getEstudiante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const estudiante = yield getEstudianteById(id);
    if (estudiante) {
        res.json({ estudiante });
    }
    else {
        res.status(404).json({
            msg: 'Estudiante no encontrado'
        });
    }
});
exports.getEstudiante = getEstudiante;
const postEstudiante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const usuario = yield (0, usuarios_1.saveUser)(body);
        const newEstudiante = yield estudiante_1.default.create({ institucion: body.institucion, usuario_id: usuario.dataValues.id });
        const estudiante = yield getEstudianteById(newEstudiante.dataValues.id);
        if (!estudiante) {
            return res.status(400).json({
                msg: 'Error al obtener el estudiante: ' + newEstudiante.dataValues.id
            });
        }
        res.json(estudiante);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al crear el estudiante'
        });
    }
});
exports.postEstudiante = postEstudiante;
const putEstudiante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const updateEstudiante = yield estudiante_1.default.findByPk(id);
        if (!updateEstudiante) {
            return res.status(404).json({
                msg: 'No existe el estudiante con el id: ' + id
            });
        }
        yield updateEstudiante.update(body);
        const usuario = yield (0, usuarios_1.updateUser)(updateEstudiante.dataValues.usuario_id, body);
        if (!usuario) {
            return res.status(404).json({
                msg: 'No existe el usuario con el id: ' + id
            });
        }
        const estudiante = yield getEstudianteById(updateEstudiante.dataValues.id);
        if (!estudiante) {
            return res.status(400).json({
                msg: 'Error al obtener el estudiante: ' + updateEstudiante.dataValues.id
            });
        }
        res.json(estudiante);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al actualizar el usuario'
        });
    }
});
exports.putEstudiante = putEstudiante;
const deleteEstudiante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const estudiante = yield estudiante_1.default.findByPk(id);
    if (!estudiante) {
        return res.status(404).json({
            msg: 'No existe el estudiante con el id: ' + id
        });
    }
    const usuario = yield (0, usuarios_1.deleteUser)(estudiante.dataValues.usuario_id);
    if (!usuario) {
        return res.status(404).json({
            msg: 'No existe el usuario con el id: ' + id
        });
    }
    res.json(estudiante);
});
exports.deleteEstudiante = deleteEstudiante;
function getEstudianteById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const estudiante = yield estudiante_1.default.findByPk(id, {
            include: {
                model: usuario_1.default
            }
        });
        if (!estudiante) {
            return false;
        }
        return estudiante;
    });
}
exports.getEstudianteById = getEstudianteById;
//# sourceMappingURL=estudiante.js.map