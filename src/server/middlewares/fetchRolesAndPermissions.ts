import RolesSchema from "server/dbModels/roles";

interface RoleData {
  role_name: string;
  role_description?: string;
  permissionsNote?: string;
  trip?: any;
  travel_documents?: any;
  expense_report?: any;
  cards?: any;
  advance?: any;
  budget?: any;
  delegates?: any;
  settings?: any;
  privacy?: any;
  createdAt?: string;
  updatedAt?: string;
}

const fetchRolesAndPermissions = async (): Promise<RoleData[]> => {
  try {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    const response = await fetch('https://dev.yatra.com/trip-expense-manager/api/rolesandpermissionsget');

    if (!response.ok) {
      throw new Error(`Failed to fetch roles: ${response.status} ${response.statusText}`);
    }

    const roleData = await response.json();
    console.log("Fetched roles data:", roleData);

    let roles: RoleData[] = Array.isArray(roleData.data) ? roleData.data : [];

    if (roles.length === 0) {
      console.warn("No roles found in fetched data.");
      return [];
    }

    // If you want to process or transform any fields, do it here
    roles = roles.map(role => ({
      ...role,
      createdAt: role.createdAt ? new Date(role.createdAt).toISOString() : new Date().toISOString(),
      updatedAt: role.updatedAt ? new Date(role.updatedAt).toISOString() : new Date().toISOString()
    }));

    try {
      for (const role of roles) {
        await RolesSchema.updateOne(
          { role_name: role.role_name },
          { $set: role },
          { upsert: true }
        );
      }
      console.log("Roles successfully saved to MongoDB.");
      return roles;
    } catch (dbError) {
      console.error("Error inserting roles into MongoDB:", dbError);
      return [];
    }

  } catch (error) {
    console.error("Fetch roles error:", error);
    return [];
  }
};

export default fetchRolesAndPermissions;
