import {DataTypes} from 'sequelize';
import db from '../db/connection';
import Estudiante from './estudiante';


const Usuario = db.define('Usuario', {
    nombre: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.BOOLEAN
    }
});


export default Usuario;