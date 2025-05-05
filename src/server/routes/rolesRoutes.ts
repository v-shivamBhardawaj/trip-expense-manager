import { Application } from 'express';
import RolesSchema from 'server/dbModels/roles';
import fetchRolesAndPermissions from 'server/middlewares/fetchRolesAndPermissions';


export const registerRolesRoutes = (app: Application, APP_NAME: string) => {
    // app.use(`/${APP_NAME}/api/roles-and-permissions`, async (_req, res, next) => {
//   try {
//       const rolesAndPermissionsData = await fetchRolesAndPermissions(); // Assuming this function fetches roles and permissions data
//       res.status(200).json(rolesAndPermissionsData);
//   } catch (err) {
//       console.error("Error in roles-and-permissions route:", err);
//       next(new Error('Failed to fetch and store roles and permissions data'));
//   }
// });

app.post(`/${APP_NAME}/api/rolesandpermissionspost`, async (req, res) => {
    try {
      const data = req.body;
  
      if (!data.role_name) {
        return res.status(400).json({ success: false, message: "Missing role name" });
      }    
  
      const newEntry = new RolesSchema(data);
      await newEntry.save();
  
      res.status(201).json({ success: true, message: "Roles and permissions saved", data: newEntry });
    } catch (error) {
      console.error("Error saving roles and permissions:", error);
      res.status(500).json({ success: false, message: "Failed to store roles and permissions" });
    }
  });
  
  app.get(`/${APP_NAME}/api/rolesandpermissionsget`, async (_req, res) => {
    try {
      const roles = await RolesSchema.find();
      res.status(200).json({ success: true, data: roles });
    } catch (error) {
      console.error("Error fetching roles and permissions:", error);
      res.status(500).json({ success: false, message: "Failed to fetch roles and permissions" });
    }
  });
  
  
  app.use(`/${APP_NAME}/api/roles-and-permissions`, async (_req, res, next) => {
    try {
      const rolesAndPermissionsData = await fetchRolesAndPermissions();
      res.status(200).json({ success: true, data: rolesAndPermissionsData });
    } catch (err) {
      console.error("Error in roles-and-permissions route:", err);
      next(new Error('Failed to fetch and store roles and permissions data'));
    }
  });
  
  app.put(`/${APP_NAME}/api/rolesandpermissionsput/:id`, async (req, res) => {
    try {
      const roleId = req.params.id; // Get the role ID from the URL parameter
      const updatedData = req.body; // Get the updated data from the request body
  
      console.log('Received Request Body:', updatedData); // Add this log to debug
  
      // Basic validation of role_name and permissions (you can extend this based on other required fields)
      if (!updatedData.role_name || !updatedData.trip || !updatedData.expense_report || !updatedData.cards || !updatedData.advance) {
        return res.status(400).json({ success: false, message: "Missing required fields (role_name, permissions)" });
      }
  
      // Find the role by its ID and update it
      const updatedRole = await RolesSchema.findByIdAndUpdate(roleId, updatedData, { new: true });
  
      if (!updatedRole) {
        return res.status(404).json({ success: false, message: "Role not found" });
      }
  
      res.status(200).json({
        success: true,
        message: "Role and permissions updated successfully",
        data: updatedRole
      });
    } catch (error) {
      console.error("Error updating roles and permissions:", error);
      // Log the error to the server for debugging
      res.status(500).json({
        success: false,
        message: "Failed to update role and permissions",
        error: error instanceof Error ? error.message : 'An unknown error occurred' // Optional: Send the error message for debugging purposes
      });
    }
  });
};
