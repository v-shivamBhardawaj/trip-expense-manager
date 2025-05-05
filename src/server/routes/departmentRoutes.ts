import { Application } from 'express';
import mongoose from 'mongoose';
import Department from 'server/dbModels/department';


export const registerDepartmentRoutes = (app: Application, APP_NAME: string) => {
    app.post(`/${APP_NAME}/api/department-post`, async (req, res) => {
        try {
          const { departmentName, departmentCode, departmentHead, departmentDescription, users } = req.body;
      
          if (!departmentName || !departmentCode || !departmentHead) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
          }
      
          // Ensure that departmentHead and users are in ObjectId format
          const departmentHeadId = new mongoose.Types.ObjectId(departmentHead);  // Convert to ObjectId
          const userIds = users.map((userId: string) => new mongoose.Types.ObjectId(userId));  // Convert userIds to ObjectIds
      
          const newDept = new Department({
            departmentName,
            departmentCode,
            departmentHead: departmentHeadId,
            departmentDescription,
            users: userIds,  // Save users as ObjectIds
          });
      
          await newDept.save();
      
          res.status(201).json({ success: true, message: "Department created", department: newDept });
        } catch (error) {
          console.error("Error creating department:", error);
          res.status(500).json({ success: false, message: "Failed to create department" });
        }
      });
      
      // Get all departments
      app.get(`/${APP_NAME}/api/department-get`, async (_req, res) => {
        try {
          const departments = await Department.find()
            .populate('departmentHead', 'name email') // Populating departmentHead with name & email
            .populate('users', 'name email'); // Optional: Populate users if included in schema
      
          if (!departments || departments.length === 0) {
            return res.status(404).json({ success: false, message: "No departments found" });
          }
      
          res.status(200).json({ success: true, departments });
        } catch (error) {
          console.error("Error fetching departments:", error);
          res.status(500).json({ success: false, message: "Failed to fetch department data" });
        }
      });
      
      app.use(`/${APP_NAME}/api/department`, async (_req, res, next) => {
        try {
          const departments = await Department.find().populate('departmentHead', 'name email');
          res.status(200).json({ success: true, departments });
        } catch (err) {
          console.error("Error in department route:", err);
          next(new Error('Failed to fetch and store department data'));
        }
      });
};
