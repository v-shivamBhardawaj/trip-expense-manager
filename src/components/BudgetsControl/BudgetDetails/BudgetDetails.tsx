import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

// Define the interfaces for the budget and expense data
interface SubExpense {
  fixed_amount_of_each_period: number;
  adjust_by_amount_of_each_period: number;
  adjust_by_percentage_of_each_period: number;
}

interface Expense {
  fixed_amount_of_each_period: number;
  adjust_by_amount_of_each_period: number;
  adjust_by_percentage_of_each_period: number;
  sub_expenses: SubExpense[];
}

interface BudgetDetails {
  expense_accounts: {
    expenses: {
      [key: string]: Expense; // Dynamic keys for expenses
    };
  };
}

interface Budget {
  budget_category: string;
  user_name: string;
  fiscal_year: string;
  budget_period: string;
  budget_type: string;
  actuals_tracking_preference: string;
  budget_details: BudgetDetails;
}

const BudgetDetails = () => {
  const location = useLocation();
  const budgetData = location.state?.budget as Budget; // Cast to Budget type

  if (!budgetData) {
    return <Typography variant="body2" sx={{ color: "red", mt: 2 }}>No budget details available.</Typography>;
  }

  const { budget_category, user_name, fiscal_year, budget_period, budget_type, actuals_tracking_preference, budget_details } = budgetData;

  return (
    <>
      <Typography variant="h6" component="div">
        Budget Category: {budget_category}
      </Typography>
      <Typography variant="h6" component="div">
        User Name: {user_name}
      </Typography>
      <Typography variant="h6" component="div">
        Fiscal Year: {fiscal_year}
      </Typography>
      <Typography variant="h6" component="div">
        Budget Period: {budget_period}
      </Typography>
      <Typography variant="h6" component="div">
        Budget Type: {budget_type}
      </Typography>
      <Typography variant="h6" component="div">
        Actuals Tracking Preference: {actuals_tracking_preference}
      </Typography>

      {/* Displaying budget details */}
      <Typography variant="h6" component="div" sx={{ mt: 2 }}>
        Budget Details:
      </Typography>
      <Typography variant="body2">
        <strong>Expense Accounts:</strong>
      </Typography>
      {budget_details.expense_accounts.expenses && Object.entries(budget_details.expense_accounts.expenses).map(([key, expense]: [string, Expense]) => (
        <div key={key}>
          <Typography variant="body2">
            <strong>Expense Type:</strong> {key}
          </Typography>
          <Typography variant="body2">
            <strong>Fixed Amount of Each Period:</strong> {expense.fixed_amount_of_each_period}
          </Typography>
          <Typography variant="body2">
            <strong>Adjust by Amount of Each Period:</strong> {expense.adjust_by_amount_of_each_period}
          </Typography>
          <Typography variant="body2">
            <strong>Adjust by Percentage of Each Period:</strong> {expense.adjust_by_percentage_of_each_period}
          </Typography>
          {expense.sub_expenses && expense.sub_expenses.length > 0 && (
            <>
              <Typography variant="body2" sx={{ mt: 1 }}>
                <strong>Sub Expenses:</strong>
              </Typography>
              {expense.sub_expenses.map((subExpense: SubExpense, index: number) => (
                <div key={index}>
                  <Typography variant="body2">
                    <strong>Fixed Amount of Each Period:</strong> {subExpense.fixed_amount_of_each_period}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Adjust by Amount of Each Period:</strong> {subExpense.adjust_by_amount_of_each_period}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Adjust by Percentage of Each Period:</strong> {subExpense.adjust_by_percentage_of_each_period}
                  </Typography>
                </div>
              ))}
            </>
          )}
          <hr />
        </div>
      ))}
    </>
  );
};

export default BudgetDetails;