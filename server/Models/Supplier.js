import mongoose, { Schema } from "mongoose";

const supplierSchema = new Schema({
  name: String,
  jib: String,
  pdv: String,
  telephone: String,
  contactPerson: String,
  email: String,
  startDate: {
    type: Date,
  },
  completionDate: {
    type: Date,
  },
});

const Supplier = mongoose.model("Supplier", supplierSchema);

export default Supplier;
