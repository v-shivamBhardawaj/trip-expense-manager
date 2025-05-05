import { Application } from 'express';
import Budget from 'server/dbModels/budget';
import { fetchBudgets } from 'server/middlewares/fetchBudget';


export const registerBudgetRoutes = (app: Application, APP_NAME: string) => {
    app.use(`/${APP_NAME}/api/budgets`, async (_req, res, next) => {
        try {
            const budgetData = await fetchBudgets(); 
            res.status(200).json(budgetData);
        } catch (err) {
            console.error("Error in budgets route:", err);
            next(new Error('Failed to fetch and store budget data'));
        }
      });
      
      // Endpoint to create a new budget
      app.post(`/${APP_NAME}/api/budget-post`, async (req, res) => {
        try {
            const budgetData = req.body; // Get the budget data from the request body
      
            // Check if a budget with the same ID already exists
            const existingBudget = await Budget.findOne({ budget_id: budgetData.budget_id });
            if (existingBudget) {
                return res.status(400).json({ success: false, message: "Budget with this ID already exists." });
            }
      
            // Create a new budget instance
            const newBudget = new Budget(budgetData);
            await newBudget.save(); // Save the budget to the database
            res.status(201).json({ success: true, message: "Budget saved successfully!", budget: newBudget });
        } catch (error) {
            console.error("Error saving budget:", error);
            res.status(500).json({ success: false, message: "Failed to store budget data" });
        }
      });
      
      app.get(`/${APP_NAME}/api/budget-get`, async (_req, res) => {
        try {
            // Fetch all budgets from the MongoDB database
            const budgets = await Budget.find(); // This retrieves all budget documents
      
            if (!Array.isArray(budgets) || budgets.length === 0) {
                console.warn("No budgets found in the database.");
                return res.status(404).json({ success: false, message: "No budgets found." }); // Return 404 if no budgets are found
            }
      
            res.status(200).json({ success: true, budgets }); // Return the fetched budgets
        } catch (error) {
            console.error("Error fetching budgets:", error);
            res.status(500).json({ success: false, message: "Failed to fetch budget data" }); // Return 500 on error
        }
      });
      
};
