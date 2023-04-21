import { Schema, model } from "mongoose";

const habitacionSchema = new Schema(
  {
    numero_habitacion: Number,
    tipo_pieza: Number, //1: simple, 2: doble, 3:matrimonial...
    precio: Number,
    disponibilidad: Boolean, //true: disponible, false: no disponible
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Habitacion", habitacionSchema);
