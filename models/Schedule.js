import { Schema, model, models } from "mongoose";
const scheduleSchema = new Schema({
  date: { type: String, required: true },
  time: { type: String, required: true, unique: true },
  numberOfPatients: { type: Number, required: true },
  patient: [{ type: Schema.Types.ObjectId, ref: "UserInfo", populate: true }],
});
const userSchema = models.Schedule || model("Schedule", scheduleSchema);
export default userSchema;
