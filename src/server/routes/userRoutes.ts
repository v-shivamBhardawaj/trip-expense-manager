import { Application } from 'express';
import User from 'server/dbModels/users';
import { fetchUsers } from 'server/middlewares/fetchUsers';


export const registerUserRoutes = (app: Application, APP_NAME: string) => {
    app.use(`/${APP_NAME}/api/users`, async (_req, res, next) => {
        try {
            const userData = await fetchUsers(); 
            res.status(200).json(userData);
        } catch (err) {
            console.error("Error in users route:", err);
            next(new Error('Failed to fetch and store user data'));
        }
      });
    
    
      app.post(`/${APP_NAME}/api/user-post`, async (req, res) => {
        try {
            const userData = req.body; // Get the user data from the request body
    
            // Check if the user already exists
            const existingUser  = await User.findOne({ user_id: userData.user_id });
            if (existingUser ) {
                return res.status(400).json({ success: false, message: "User  with this ID already exists." });
            }
    
            // Create a new user instance
            const newUser  = new User(userData);
            await newUser .save(); // Save the user to the database
            res.status(201).json({ success: true, message: "User  added successfully!", user: newUser  });
        } catch (error) {
            console.error("Error saving user:", error);
            res.status(500).json({ success: false, message: "Failed to store user data" });
          }
      });
    
      app.get(`/${APP_NAME}/api/user-get`, async (_req, res) => {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            console.error("Error fetching users:", error);
            res.status(500).json({ success: false, message: "Failed to fetch user data" });
        }
      });
};
