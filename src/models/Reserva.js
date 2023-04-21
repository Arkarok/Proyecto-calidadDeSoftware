import { Schema, model } from "mongoose";

const reservaSchema = new Schema(
  {
    idf_cliente: String,
    numero_habitacion: String,
    fecha_entrada: Date,
    numero_dias: Number,
    precio_total: Number,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Reserva", reservaSchema);
