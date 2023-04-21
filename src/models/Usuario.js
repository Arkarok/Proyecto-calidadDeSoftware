import { Schema, model } from "mongoose";

const usuarioSchema = new Schema(
  {
    nombre: String,
    tipo_usuario: Number, // 1: recepcionista, 2: administrador, 3: cliente habitual, 4: cliente esporádico...
    identificacion: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("usuario", usuarioSchema);
