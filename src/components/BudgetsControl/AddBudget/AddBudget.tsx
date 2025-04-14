import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, FormControlLabel, Checkbox, MenuItem, Divider } from '@mui/material';
import { APP_NAME } from 'constants/commonConstants';

// Define the Expense interface
interface Expense {
    fixed_amount_of_each_period?: number;
    adjust_by_amount_of_each_period?: number;
    adjust_by_percentage_of_each_period?: number;
    sub_expenses?: { [key: string]: Expense }; // For nested expenses
}

// Define the BudgetDetails interface
interface BudgetDetails {
    expense_accounts: {
        expenses: {
            [key: string]: Expense; // Use an index signature for dynamic keys
        };
    };
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
}

const AddBudget: React.FC = () => {
    const initialBudgetState: Budget = {
        budget_id: 0,
        budget_category: '',
        user_name: '',
        fiscal_year: '',
        budget_period: '',
        budget_type: '',
        actuals_tracking_preference: '',
        budget_details: {
            expense_accounts: {
                expenses: {}
            }
        }
    };

    const [budgetDetails, setBudgetDetails] = useState<Budget>(initialBudgetState);
    const [selectedExpenses, setSelectedExpenses] = useState<string[]>([]);

    const categories = [
        "Office Supplies",
        "Air Travel",
        "Telephone",
        "Automobile Expense",
        "IT and Internet Expenses",
        "Meals and Entertainment",
        "Other Expenses",
        "Lodging",
        "Fuel/Mileage Expenses",
        "Parking"
    ];

    const expenses = [
        "Food",
        "Rental",
        "Taxi",
        "Incidentals",
        "Goods",
        "Services",
        "Others",
        "Allowances"
    ];

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const expense = event.target.name;
        setSelectedExpenses(prev => 
            event.target.checked 
                ? [...prev, expense] 
                : prev.filter(item => item !== expense)
        );
    };

    const handleAddExpense = () => {
        const newExpenses = { ...budgetDetails.budget_details.expense_accounts.expenses };

        selectedExpenses.forEach(expenseKey => {
            if (!newExpenses[expenseKey]) {
                newExpenses[expenseKey] = {
                    fixed_amount_of_each_period: 0,
                    adjust_by_amount_of_each_period: 0,
                    adjust_by_percentage_of_each_period: 0,
                    sub_expenses: {} // Initialize sub_expenses
                };
            }
        });

        setBudgetDetails(prevState => ({
            ...prevState,
            budget_details: {
                ...prevState.budget_details,
                expense_accounts: {
                    expenses: newExpenses
                }
            }
        }));

        // Clear selected expenses after adding
        setSelectedExpenses([]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Budget Details:", budgetDetails); // Log the budget details
        try {
            const response = await fetch(`/${APP_NAME}/api/budget-post`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(budgetDetails), // Send the budget details as JSON
            });
    
            if (!response.ok) {
                throw new Error('Failed to save budget');
            }
    
            const result = await response.json();
            console.log(result); // Log the response from the server

            // Reset the form to its initial state
            setBudgetDetails(initialBudgetState);
            setSelectedExpenses([]); // Clear selected expenses

            // Optionally, you can show a success message
        } catch (error) {
            console.error("Error submitting budget:", error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Add New Budget
                </Typography>
                <TextField 
                    fullWidth 
                    margin="normal" 
                    id="budget_id" 
                    name="budget_id" 
                    label="Budget ID" 
                    type="number" 
                    value={budgetDetails.budget_id} 
                    onChange={(e) => setBudgetDetails({ ...budgetDetails, budget_id: Number(e.target.value) })} 
                    required 
                />
                <TextField 
                    fullWidth 
                    margin="normal" 
                    id="budget_category" 
                    name="budget_category" 
                    label="Budget Category" 
                    value={budgetDetails.budget_category} 
                    onChange={(e) => setBudgetDetails({ ...budgetDetails, budget_category: e.target.value })} 
                    required 
                />
                <TextField 
                    fullWidth 
                    margin="normal" 
                    id="user_name" 
                    name="user_name" 
                    label="User  Name" 
                    value={budgetDetails.user_name} 
                    onChange={(e) => setBudgetDetails({ ...budgetDetails, user_name: e.target.value })} 
                    required 
                />
                <TextField 
                    fullWidth 
                    margin="normal" 
                    id="fiscal_year" 
                    name="fiscal_year" 
                    label="Fiscal Year" 
                    value={budgetDetails.fiscal_year} 
                    onChange={(e) => setBudgetDetails({ ...budgetDetails, fiscal_year: e.target.value })} 
                    required 
                />
                <TextField 
                    select 
                    fullWidth 
                    margin="normal" 
                    id="budget_period" 
                    name="budget_period" 
                    label="Budget Period" 
                    value={budgetDetails.budget_period} 
                    onChange={(e) => setBudgetDetails({ ...budgetDetails, budget_period: e.target.value })} 
                    required
                >
                    <MenuItem value="monthly">Monthly</MenuItem>
                    <MenuItem value="quarterly">Quarterly</MenuItem>
                    <MenuItem value="yearly">Yearly</MenuItem>
                </TextField>
                <TextField 
                    select 
                    fullWidth 
                    margin="normal" 
                    id="budget_type" 
                    name="budget_type" 
                    label="Budget Type" 
                    value={budgetDetails.budget_type} 
                    onChange={(e) => setBudgetDetails({ ...budgetDetails, budget_type: e.target.value })} 
                    required
                >
                    <MenuItem value="category">Category</MenuItem>
                    <MenuItem value="expense">Expense</MenuItem>
                </TextField>
                <TextField 
                    select 
                    fullWidth 
                    margin="normal" 
                    id="actuals_tracking_preference" 
                    name="actuals_tracking_preference" 
                    label="Actuals Tracking Preference" 
                    value={budgetDetails.actuals_tracking_preference} 
                    onChange={(e) => setBudgetDetails({ ...budgetDetails, actuals_tracking_preference: e.target.value })} 
                    required
                >
                    <MenuItem value="individual_category">Individual Category</MenuItem>
                    <MenuItem value="individual_expense_type">Individual Expense Type</MenuItem>
                </TextField>

                <Typography variant="h6" component="h2" gutterBottom>
                    Select Expenses
                </Typography>
                {(budgetDetails.budget_type === "category" ? categories : expenses).map((expense) => (
                    <FormControlLabel
                        key={expense}
                        control={
                            <Checkbox
                                checked={selectedExpenses.includes(expense)}
                                onChange={handleCheckboxChange}
                                name={expense}
                            />
                        }
                        label={expense}
                    />
                ))}
                <Button variant="contained" color="primary" onClick={handleAddExpense}>
                    Add Selected Expenses
                </Button>

                {/* Render added expenses */}
                {Object.keys(budgetDetails.budget_details.expense_accounts.expenses).map((expenseKey) => (
                    <div key={expenseKey}>
                        <Typography variant="subtitle1">{expenseKey}</Typography>
                        <TextField
                            fullWidth
                            margin="normal"
                            name="fixed_amount_of_each_period"
                            label="Fixed Amount of Each Period"
                            type="number"
                            value={budgetDetails.budget_details.expense_accounts.expenses[expenseKey]?.fixed_amount_of_each_period || ''}
                            onChange={(e) => {
                                const value = Number(e.target.value);
                                setBudgetDetails(prevState => ({
                                    ...prevState,
                                    budget_details: {
                                        ...prevState.budget_details,
                                        expense_accounts: {
                                            ...prevState.budget_details.expense_accounts,
                                            expenses: {
                                                ...prevState.budget_details.expense_accounts.expenses,
                                                [expenseKey]: {
                                                    ...prevState.budget_details.expense_accounts.expenses[expenseKey],
                                                    fixed_amount_of_each_period: value
                                                }
                                            }
                                        }
                                    }
                                }));
                            }}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            name="adjust_by_amount_of_each_period"
                            label="Adjust by Amount of Each Period"
                            type="number"
                            value={budgetDetails.budget_details.expense_accounts.expenses[expenseKey]?.adjust_by_amount_of_each_period || ''}
                            onChange={(e) => {
                                const value = Number(e.target.value);
                                setBudgetDetails(prevState => ({
                                    ...prevState,
                                    budget_details: {
                                        ...prevState.budget_details,
                                        expense_accounts: {
                                            ...prevState.budget_details.expense_accounts,
                                            expenses: {
                                                ...prevState.budget_details.expense_accounts.expenses,
                                                [expenseKey]: {
                                                    ...prevState.budget_details.expense_accounts.expenses[expenseKey],
                                                    adjust_by_amount_of_each_period: value
                                                }
                                            }
                                        }
                                    }
                                }));
                            }}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            name="adjust_by_percentage_of_each_period"
                            label="Adjust by Percentage of Each Period"
                            type="number"
                            value={budgetDetails.budget_details.expense_accounts.expenses[expenseKey]?.adjust_by_percentage_of_each_period || ''}
                            onChange={(e) => {
                                const value = Number(e.target.value);
                                setBudgetDetails(prevState => ({
                                    ...prevState,
                                    budget_details: {
                                        ...prevState.budget_details,
                                        expense_accounts: {
                                            ...prevState.budget_details.expense_accounts,
                                            expenses: {
                                                ...prevState.budget_details.expense_accounts.expenses,
                                                [expenseKey]: {
                                                    ...prevState.budget_details.expense_accounts.expenses[expenseKey],
                                                    adjust_by_percentage_of_each_period: value
                                                }
                                            }
                                        }
                                    }
                                }));
                            }}
                        />
                    </div>
                ))}

                <Divider orientation="horizontal" variant="middle" flexItem />
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    Add Budget
                </Button>
            </Box>
        </Container>
    );
};

export { AddBudget };