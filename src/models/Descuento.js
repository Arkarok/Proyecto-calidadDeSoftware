import { Schema, model } from "mongoose";

const descuentoSchema = new Schema(
  {
    descuento: Number, // Esto sera como un porcentaje, por ejemplo 10% de descuento pero debe ser escrito sin el signo de porcentaje
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Descuento", descuentoSchema);
