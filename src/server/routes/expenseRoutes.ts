import { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
// import { fetchExpenses } from 'server/middlewares/fetchExpenses';
import Expense from 'server/dbModels/expenses';

export const registerExpenseRoutes = (app: Application, APP_NAME: string) => {

//   app.use(`/${APP_NAME}/api/expenses`, async (_req, res, next) => {
//     try {
//       const expensesData = await fetchExpenses();
//       res.status(200).json(expensesData);
//     } catch (err) {
//       console.error("Error in expenses route:", err);
//       next(new Error('Failed to fetch and store expenses data')); 
//     }
//   });

  // POST route to save a new expense
  app.post(`/${APP_NAME}/api/expensepost`, async (req: Request, res: Response) => {
    try {
      const { trip_id, user_id, category, amount, date, description } = req.body;

      const newExpense = new Expense({
        trip_id: new mongoose.Types.ObjectId(trip_id), 
        user_id: new mongoose.Types.ObjectId(user_id),
        category,
        amount,
        date,
        description
      });

      await newExpense.save();
      res.status(201).json({ message: 'Expense saved successfully', expense: newExpense });
    } catch (err) {
      console.error('Error saving expense:', err);
      res.status(500).json({ error: 'Failed to save expense' });
    }
  });

  app.get(`/${APP_NAME}/api/expenseget`, async (_req, res) => {
    try {
      const expenses = await Expense.find()
        .populate('trip_id', 'trip_name')    // populate only the 'trip_name' field from Trip
        .populate('user_id', 'name');        // populate only the 'name' field from User
  
      if (!expenses || expenses.length === 0) {
        return res.status(404).json({ message: 'No expenses found' });
      }
  
      res.status(200).json(expenses);
    } catch (err) {
      console.error('Error fetching expenses:', err);
      res.status(500).json({ error: 'Failed to fetch expenses' });
    }
  });
  
};
