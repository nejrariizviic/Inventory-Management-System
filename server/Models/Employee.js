import mongoose, { Schema } from "mongoose";

const employeeSchema = new Schema({
  firstName: String,
  lastName: String,
  telephone: String,
  address: String,
  email: String,
  dateOfEmployment: {
    type: Date,
  },
  dateOfCancellation: {
    type: Date,
  },
});

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
