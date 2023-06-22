"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const usuario_1 = __importDefault(require("./usuario"));
const Estudiante = connection_1.default.define('Estudiante', {
    institucion: {
        type: sequelize_1.DataTypes.STRING
    },
    ruta: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    usuario_id: {
        type: sequelize_1.DataTypes.BOOLEAN
    }
});
Estudiante.belongsTo(usuario_1.default, {
    foreignKey: 'usuario_id'
});
exports.default = Estudiante;
//# sourceMappingURL=estudiante.js.map