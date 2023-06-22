import { Request, Response, json } from "express";
import Estudiante from "../models/estudiante";
import Usuario from "../models/usuario";
import {updateUser, saveUser, deleteUser} from "../controllers/usuarios";

export const getEstudiantes = async (req : Request, res : Response) => {

    const estudiantes = await Estudiante.findAll({
        include: {
            model: Usuario
        }
    });

    res.json({estudiantes});

}

export const getEstudiante = async (req : Request, res : Response) => {

    const {id} = req.params;
    const estudiante = await getEstudianteById(id);
    if (estudiante) {
        res.json({estudiante});
    } else {
        res.status(404).json({
            msg: 'Estudiante no encontrado'
        });
    }

} 

export const postEstudiante = async (req : Request, res : Response) => {

    const {body} = req;

    try {
        const emailExist = await Usuario.findOne({
            where: {
                email: body.email
            }
        });
        if (emailExist) {
            return res.status(400).json({
                msg: 'Ya existe un usuario con el email: ' + body.email
            });
        }
        const usuario = await saveUser(body);
        const newEstudiante = await Estudiante.create({institucion: body.institucion, usuario_id: usuario.dataValues.id});
        const estudiante = await getEstudianteById(newEstudiante.dataValues.id);
        if (!estudiante) {
            return res.status(400).json({
                msg: 'Error al obtener el estudiante: ' + newEstudiante.dataValues.id
            });
        }
        res.json(estudiante);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al crear el estudiante'
        });   
    }

} 

export const putEstudiante = async (req : Request, res : Response) => {

    const {id} = req.params;
    const {body} = req;

    try {
        const updateEstudiante = await Estudiante.findByPk(id);
        if (!updateEstudiante) {
            return res.status(404).json({
                msg : 'No existe el estudiante con el id: ' + id
            });
        }

        await updateEstudiante.update(body);
        const usuario = await updateUser(updateEstudiante.dataValues.usuario_id, body);
        if (!usuario) {
            return res.status(404).json({
                msg : 'No existe el usuario con el id: ' + id
            });
        }
        const estudiante = await getEstudianteById(updateEstudiante.dataValues.id);
        if (!estudiante) {
            return res.status(400).json({
                msg: 'Error al obtener el estudiante: ' + updateEstudiante.dataValues.id
            });
        }
        res.json(estudiante);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al actualizar el usuario'
        });   
    }

} 

export const deleteEstudiante = async (req : Request, res : Response) => {

    const {id} = req.params;

    const estudiante = await Estudiante.findByPk(id);
    if (!estudiante) {
        return res.status(404).json({
            msg : 'No existe el estudiante con el id: ' + id
        });
    }

    const usuario = await deleteUser(estudiante.dataValues.usuario_id);
    if (!usuario) {
        return res.status(404).json({
            msg : 'No existe el usuario con el id: ' + id
        });
    }

    res.json(estudiante);

}

export async function getEstudianteById(id: string) {
    const estudiante = await Estudiante.findByPk(id, {
        include: {
            model: Usuario
        }
    });
    if (!estudiante) {
        return false;
    }
    return estudiante;
}



