import { Schema, model, models } from "mongoose";
const userInfo = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", populate: true },
  medicalReciet: { type: String },
  schoolfeeReciet: { type: String },
});

const userInfoSchema =  models.UserInfo || model("UserInfo", userInfo);
export default userInfoSchema;
