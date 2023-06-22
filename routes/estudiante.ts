import {Router} from 'express';
import { deleteEstudiante, getEstudiante, getEstudiantes, postEstudiante, putEstudiante } from '../controllers/estudiante';

const router = Router();


router.get('/', getEstudiantes);
router.get('/:id', getEstudiante);
router.post('/', postEstudiante);
router.put('/:id', putEstudiante);
router.delete('/:id', deleteEstudiante);


export default router;