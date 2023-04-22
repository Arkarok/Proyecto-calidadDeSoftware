import { Schema, model } from "mongoose";

const personSchema = new Schema(
  {
    ID: String,
    name: String,
    personType: Number, // 1: resident, 2: visitor, 3: delivery
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("usuario", personSchema);
