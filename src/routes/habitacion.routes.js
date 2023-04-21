import { Router } from "express";
const router = Router();

import * as habitacionCtrl from "../controllers/habitacion.controller";

router.post("/create", habitacionCtrl.createHabitacion);

router.get("/habitaciones", habitacionCtrl.getHabitaciones); //Obtener un listado de las piezas disponible de acuerdo con su tipo

router.get("/precio", habitacionCtrl.getPrecioHabitacionPorTipo); //Obtener el precio de una habitacion por tipo

router.put(
  "/cambiar-precio-tipo",
  habitacionCtrl.cambiarPrecioHabitacionPorTipo
); //Cambiar el precio de una habitacion por tipo");

export default router;
