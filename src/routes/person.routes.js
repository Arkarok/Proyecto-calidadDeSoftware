import { Router } from "express";
const router = Router();

import * as personCtrl from "../controllers/person.controller";

router.get("/", personCtrl.renderIndex);
router.get("/registro", personCtrl.renderRegistroForm);
router.get("/ingreso", personCtrl.renderIngreso);
router.get("/logger", personCtrl.renderLogger);
router.post("/registros/newRegistro", personCtrl.createUsuario);
router.post("/ingresos/newIngreso", personCtrl.saveLog);
//router.post("/ingresos/allIngresos", personCtrl.prepareLogger);

export default router;
