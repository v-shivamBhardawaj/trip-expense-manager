import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
    trip_id: { type: mongoose.Schema.Types.ObjectId, ref: "Trip", required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    description: { type: String }
}, { _id: true });
const Expense = mongoose.model("Expense", ExpenseSchema);
export default Expense;``