import BudgetModel from "server/dbModels/budget"; // Import the Budget model
import { ObjectId } from "mongodb";

// Define the SubExpense interface
interface SubExpense {
    fixed_amount_of_each_period: number;
    adjust_by_amount_of_each_period: number;
    adjust_by_percentage_of_each_period: number;
    _id?: ObjectId | null; // Update the type to include null
}

// Define the Expense interface
interface Expense {
    fixed_amount_of_each_period: number;
    adjust_by_amount_of_each_period: number;
    adjust_by_percentage_of_each_period: number;
    sub_expenses: SubExpense[];
    _id?: ObjectId | null; // Update the type to include null
}

// Define the BudgetDetails interface
interface BudgetDetails {
    expense_accounts: {
        expenses: {
            [key: string]: Expense; // Dynamic keys for expenses
        };
    };
    _id?: ObjectId | null; // Add the _id property
}

// Define the Budget interface
interface Budget {
    budget_id: number;
    budget_category: string;
    user_name: string;
    fiscal_year: string;
    budget_period: string;
    budget_type: string;
    actuals_tracking_preference: string;
    budget_details: BudgetDetails;
    _id: ObjectId; // Update the type of _id to ObjectId
    __v?: number; // Optional version key
}

export const fetchBudgets = async (): Promise<Budget[]> => {
    try {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        const response = await fetch('https://dev.yatra.com/trip-expense-manager/api/budget-get');

        if (!response.ok) {
            throw new Error(`Failed to fetch budget data: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        const budgets: Budget[] = data.budgets || []; // Ensure budgets is typed

        if (!Array.isArray(budgets) || budgets.length === 0) {
            console.warn("No budgets found in fetched data.");
            return [];
        }

        // Transform the fetched budgets to the desired format
        const transformedBudgets = budgets.map(budget => {
            return {
                budget_id: budget.budget_id || 0,
                budget_category: budget.budget_category || "Office Supplies",
                user_name: budget.user_name || "Shivam",
                fiscal_year: budget.fiscal_year || "2024-25",
                budget_period: budget.budget_period || "quarterly",
                budget_type: budget.budget_type || "category",
                actuals_tracking_preference: budget.actuals_tracking_preference || "individual_expense_type",
                budget_details: {
                    expense_accounts: {
                        expenses: Object.entries(budget.budget_details.expense_accounts.expenses).reduce((acc, [key, expense]: [string, Expense]) => {
                            acc[key] = {
                                fixed_amount_of_each_period: expense.fixed_amount_of_each_period || 0,
                                adjust_by_amount_of_each_period: expense.adjust_by_amount_of_each_period || 0,
                                adjust_by_percentage_of_each_period: expense.adjust_by_percentage_of_each_period || 0,
                                sub_expenses: (expense.sub_expenses || []).map((subExpense: SubExpense) => ({
                                    fixed_amount_of_each_period: subExpense.fixed_amount_of_each_period || 0,
                                    adjust_by_amount_of_each_period: subExpense.adjust_by_amount_of_each_period || 0,
                                    adjust_by_percentage_of_each_period: subExpense.adjust_by_percentage_of_each_period || 0,
                                    _id: subExpense._id || null // Ensure _id is included
                                })),
                                _id: expense._id || null // Ensure _id is included for the expense
                            };
                            return acc;
                        }, {} as { [key: string]: Expense }) // Specify the accumulator type
                    },
                    _id: budget.budget_details._id || null // Ensure _id is included for budget_details
                },
                _id: budget._id || new ObjectId(), // Ensure _id is included
                __v: budget.__v || 0 // Include version key if present
            };
        });

        // Insert the transformed budgets into the database
        for (const budget of transformedBudgets) {
            const existingBudget = await BudgetModel.findOne({ budget_id: budget.budget_id });
            if (!existingBudget) {
                await BudgetModel.create(budget); // Use create instead of insertMany for individual checks
            } else {
                console.log(`Budget with ID ${budget.budget_id} already exists. Skipping insertion.`);
            }
        }

        return transformedBudgets; // Return the transformed budgets

    } catch (error) {
        console.error("Error fetching budgets:", error);
        throw error;
    }
};