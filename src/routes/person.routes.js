import { Router } from "express";
const router = Router();

import * as personCtrl from "../controllers/person.controller";

router.get("/", personCtrl.renderIndex);
router.get("/registro", personCtrl.renderRegistroForm);
router.get("/ingreso", personCtrl.renderIngreso);
router.get("/logger", personCtrl.renderLogger);
router.post("/registros/newRegistro", personCtrl.createUsuario);
router.post("/ingreso/newIngreso", personCtrl.saveLog)

// router.put("/change-descuento", personCtrl.changeDescuento);

// router.get("/get-descuento", personCtrl.getDescuento);

// router.get("/clientes-habituales", personCtrl.clientesHabituales);

export default router;
