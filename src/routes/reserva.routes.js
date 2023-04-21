import { Router } from "express";
const router = Router();

import * as reservaCtrl from "../controllers/reserva.controller";

router.post("/create", reservaCtrl.createReserva);

router.delete("/delete/:numero_habitacion", reservaCtrl.deleteReserva);

router.get("/precio-total-cliente", reservaCtrl.getPrecioTotalPorCliente);

router.get("/reservas-cliente", reservaCtrl.getReservasPorCliente);

export default router;
