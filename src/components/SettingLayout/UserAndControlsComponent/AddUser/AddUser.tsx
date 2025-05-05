import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Typography, Box, Paper, Divider, IconButton, MenuItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { APP_NAME } from 'constants/commonConstants';

interface User {
    user_id: string;
    budget_id: string;
    name: string;
    display_name: string;
    employee_id: string;
    email: string;
    mobile: string;
    role: string;
    submits_to?: string;
    approves_and_forwards_too?: string;
    department: string;
    dob: string;
    gender: string;
    doj: string;
    designation: string;
}

const AddUser: React.FC = () => {
    const [userDetails, setUserDetails] = useState<User>({
        user_id: '',
        budget_id: '',
        name: '',
        display_name: '',
        employee_id: '',
        email: '',
        mobile: '',
        role: '',
        submits_to: '',
        approves_and_forwards_too: '',
        department: '',
        dob: '',
        gender: '',
        doj: '',
        designation: ''
    });

    const [roles, setRoles] = useState<{ _id: string; role_name: string }[]>([]);
    const [departments, setDepartments] = useState<{ _id: string; departmentName: string }[]>([]);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await fetch(`/${APP_NAME}/api/rolesandpermissionsget`);
                const result = await response.json();
                if (result.success) {
                    setRoles(result.data);
                } else {
                    console.error("Failed to fetch roles");
                }
            } catch (error) {
                console.error("Error fetching roles:", error);
            }
        };

        const fetchDepartments = async () => {
            try {
                const response = await fetch(`/${APP_NAME}/api/department-get`);
                const result = await response.json();
                if (result.success) {
                    setDepartments(result.departments);
                } else {
                    console.error("Failed to fetch departments");
                }
            } catch (error) {
                console.error("Error fetching departments:", error);
            }
        };

        fetchRoles();
        fetchDepartments();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUserDetails({
            ...userDetails,
            [name]: value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`/${APP_NAME}/api/user-post`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userDetails),
            });

            if (!response.ok) {
                throw new Error('Failed to add user');
            }

            const data = await response.json();
            console.log('User added successfully:', data);

            setUserDetails({
                user_id: '',
                budget_id: '',
                name: '',
                display_name: '',
                employee_id: '',
                email: '',
                mobile: '',
                role: '',
                submits_to: '',
                approves_and_forwards_too: '',
                department: '',
                dob: '',
                gender: '',
                doj: '',
                designation: ''
            });

        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box display="flex" justifyContent="center" py={5} bgcolor="#f9f9f9">
                <Paper sx={{ width: 700, p: 4, borderRadius: 2, position: "relative" }}>
                    <IconButton onClick={() => window.history.back()} sx={{ position: 'absolute', top: 16, right: 16 }}>
                        <CloseIcon />
                    </IconButton>

                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        Add New User
                    </Typography>

                    <form onSubmit={handleSubmit}>
                    <TextField
                            label="User ID"
                            name="user_id"
                            fullWidth
                            margin="normal"
                            type="number"
                            value={userDetails.user_id}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            label="Budget ID"
                            name="budget_id"
                            fullWidth
                            margin="normal"
                            value={userDetails.budget_id}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            label="Name"
                            name="name"
                            fullWidth
                            margin="normal"
                            value={userDetails.name}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            label="Display Name"
                            name="display_name"
                            fullWidth
                            margin="normal"
                            value={userDetails.display_name}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            label="Employee ID"
                            name="employee_id"
                            fullWidth
                            margin="normal"
                            value={userDetails.employee_id}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            label="Email"
                            name="email"
                            fullWidth
                            margin="normal"
                            type="email"
                            value={userDetails.email}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            label="Mobile"
                            name="mobile"
                            fullWidth
                            margin="normal"
                            type="number"
                            value={userDetails.mobile}
                            onChange={handleChange}
                            required
                        />

                        <Divider sx={{ my: 3 }} />
                        <Typography variant="h6">Role and Department</Typography>

                        <TextField
                        select
                        label="Role"
                        name="role"
                        fullWidth
                        margin="normal"
                        value={userDetails.role}
                        onChange={handleChange}
                        required
                        >
                        {roles.map((role) => (
                            <MenuItem key={role._id} value={role._id}>
                                {role.role_name}
                            </MenuItem>
                        ))}
                        </TextField>


                        <TextField
                            label="Submits To"
                            name="submits_to"
                            fullWidth
                            margin="normal"
                            value={userDetails.submits_to}
                            onChange={handleChange}
                        />

                        <TextField
                            label="Approves and Forwards To"
                            name="approves_and_forwards_too"
                            fullWidth
                            margin="normal"
                            value={userDetails.approves_and_forwards_too}
                            onChange={handleChange}
                        />


                        {/* 👇 NEW Department Dropdown */}
                        <TextField
                            select
                            label="Department"
                            name="department"
                            fullWidth
                            margin="normal"
                            value={userDetails.department}
                            onChange={handleChange}
                            required
                        >
                            {departments.map((dept) => (
                                <MenuItem key={dept._id} value={dept._id}>
                                    {dept.departmentName}
                                </MenuItem>
                            ))}
                        </TextField>

                        <Divider sx={{ my: 3 }} />
                        <Typography variant="h6">Personal Information</Typography>

                        <TextField
                            label="Date of Birth"
                            name="dob"
                            fullWidth
                            margin="normal"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            value={userDetails.dob}
                            onChange={handleChange}
                            required
                        />

                        <TextField
                            select
                            label="Gender"
                            name="gender"
                            fullWidth
                            margin="normal"
                            value={userDetails.gender}
                            onChange={handleChange}
                            required
                        >
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                        </TextField>

                        <TextField
                            label="Date of Joining"
                            name="doj"
                            fullWidth
                            margin="normal"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            value={userDetails.doj}
                            onChange={handleChange}
                            required
                        />

                        <TextField
                            label="Designation"
                            name="designation"
                            fullWidth
                            margin="normal"
                            value={userDetails.designation}
                            onChange={handleChange}
                            required
                        />

                        
                        <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
                            Add User
                        </Button>
                    </form>
                </Paper>
            </Box>
        </Container>
    );
};

export { AddUser };
