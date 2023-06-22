import {DataTypes} from 'sequelize';
import db from '../db/connection';
import Usuario from './usuario';

const Estudiante = db.define('Estudiante', {
    institucion: {
        type: DataTypes.STRING
    },
    ruta: {
        type: DataTypes.BOOLEAN
    },
    usuario_id: {
        type: DataTypes.BOOLEAN
    }
});

Estudiante.belongsTo(Usuario, {
    foreignKey: 'usuario_id'
});


export default Estudiante;