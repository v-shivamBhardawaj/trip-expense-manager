import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    user_id: { type: Number, required: true },
    budget_id: { type: String, required: true },
    name: { type: String, required: true },
    display_name: { type: String, required: true },
    employee_id: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: Number, required: true },
    role: { type: String, required: true },
    submits_to: { type: String, required: false },
    approves_and_forwards_too: { type: String, required: false },
    department: { type: String, required: true },
    dob: { type: String, required: true }, 
    gender: { type: String, required: true },
    doj: { type: String, required: true },
    designation: { type: String, required: true }
});


const User = mongoose.model("User", UserSchema);

export default User