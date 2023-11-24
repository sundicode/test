import { Schema, model, models } from "mongoose";
const adminSchema = new Schema({
  adminname: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  phone: { type: String },
  address: { type: String, default: null },
  post: { type: String, default: null },
  image: {
    type: String,
    default: null,
  },
  role: {
    type: String,
    default: "admin",
  },
});

// const AdminModel = mongoose.modelNames().includes("Admin")
//   ? model("Admin")
//   : model("Admin", adminSchema);

const AdminModel = models.Admin || model("Admin", adminSchema);
export default AdminModel;
