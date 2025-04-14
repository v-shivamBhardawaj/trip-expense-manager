import mongoose from "mongoose";

const SubExpenseSchema = new mongoose.Schema({
    fixed_amount_of_each_period: { type: Number, default: 0 },
    adjust_by_amount_of_each_period: { type: Number, default: 0 },
    adjust_by_percentage_of_each_period: { type: Number, default: 0 }
});

const ExpenseSchema = new mongoose.Schema({
    fixed_amount_of_each_period: { type: Number, default: 0 },
    adjust_by_amount_of_each_period: { type: Number, default: 0 },
    adjust_by_percentage_of_each_period: { type: Number, default: 0 },
    sub_expenses: { type: [SubExpenseSchema], default: [] } // Changed to an array of sub-expenses
});

const ExpenseAccountsSchema = new mongoose.Schema({
    expenses: { type: Map, of: ExpenseSchema }
});

const BudgetDetailsSchema = new mongoose.Schema({
    expense_accounts: ExpenseAccountsSchema
});

const BudgetSchema = new mongoose.Schema({
    budget_id: { type: Number, required: true },
    budget_category: { type: String, required: true },
    user_name: { type: String, required: true },
    fiscal_year: { type: String, required: true }, // Fixed typo here
    budget_period: { type: String, enum: ["monthly", "quarterly", "yearly"], required: true },
    budget_type: { type: String, required: true },
    actuals_tracking_preference: { type: String, required: true },
    budget_details: BudgetDetailsSchema
});

const Budget = mongoose.model("Budget", BudgetSchema);
export default Budget;