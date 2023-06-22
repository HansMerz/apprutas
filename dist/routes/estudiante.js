"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const estudiante_1 = require("../controllers/estudiante");
const router = (0, express_1.Router)();
router.get('/', estudiante_1.getEstudiantes);
router.get('/:id', estudiante_1.getEstudiante);
router.post('/', estudiante_1.postEstudiante);
router.put('/:id', estudiante_1.putEstudiante);
router.delete('/:id', estudiante_1.deleteEstudiante);
exports.default = router;
//# sourceMappingURL=estudiante.js.map