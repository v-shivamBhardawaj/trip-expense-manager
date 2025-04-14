import User from "server/dbModels/users";

export const fetchExpenses = async () => {
    try {
        // Disable TLS certificate validation (use with caution)
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

        // Fetch user data from the external API
        const response = await fetch('');

        // Check if the response is OK
        if (!response.ok) {
            throw new Error(`Failed to fetch Expense data: ${response.status} ${response.statusText}`);
        }

        // Parse the JSON response
        const data = await response.json();

        // Use the fetched data directly as users
        const users = Array.isArray(data) ? data : [];

        // Check if users array is valid
        if (users.length === 0) {
            console.warn("No users found in fetched data.");
            return [];
        }

        // Transform the fetched user data to match the User schema
        const transformedUsers = users.map(user => ({
            user_id: user.user_id || '',
            budget_id: user.budget_id || '',
            name: user.name || '',
            display_name: user.display_name || '',
            employee_id: user.employee_id || '',
            email: user.email || '',
            mobile: user.mobile || '',
            role: user.role || '',
            submits_to: user.submits_to || '',
            approves_and_forwards_too: user.approves_and_forwards_too || '',
            department: user.department || '',
            dob: user.dob || '',
            gender: user.gender || '',
            doj: user.doj || '',
            designation: user.designation || ''
        }));

        // Insert transformed users into the database
        for (const user of transformedUsers) {
            const existingUser  = await User.findOne({ user_id: user.user_id });
            if (!existingUser ) {
                await User.create(user); // Use create instead of insertMany for individual checks
            } else {
                console.log(`User  with ID ${user.user_id} already exists. Skipping insertion.`);
            }
        }

        return transformedUsers; // Return the transformed users

    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};