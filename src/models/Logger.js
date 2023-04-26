import { Schema, model } from "mongoose";

const loggerSchema = new Schema(
  {
    personID: String,
    entered: Boolean,
    when: Date,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Logger", loggerSchema);
