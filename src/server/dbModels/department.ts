import mongoose from 'mongoose';
// import User from './users'; // Assuming the User model is in the same directory

const DepartmentSchema = new mongoose.Schema({
  departmentName: { type: String, required: true },
  departmentCode: { type: String, required: true },
  departmentHead: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  departmentDescription: { type: String, required: true },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]  // Array of ObjectIds referencing the User model
});

const Department = mongoose.model("Department", DepartmentSchema);

export default Department;
