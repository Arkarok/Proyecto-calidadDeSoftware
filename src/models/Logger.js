import { Schema, model } from "mongoose";

const loggerSchema = new Schema(
  {
    personID: String,
    enteredAt: Date,
    exitAt: Date
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Reserva", loggerSchema);
