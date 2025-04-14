import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, MenuItem } from '@mui/material';
import { APP_NAME } from 'constants/commonConstants';

// Define the User interface
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

// Correctly define the AddUser  component
const AddUser : React.FC = () => {
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
            console.log('User  added successfully:', data);

            // Reset the form fields
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

            // Optionally show a success message or perform other actions

        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Add New User
                </Typography>
                <TextField fullWidth margin="normal" id="user_id" name="user_id" label="User  ID" type="number" value={userDetails.user_id} onChange={handleChange} required />
                <TextField fullWidth margin="normal" id="budget_id" name="budget_id" label="Budget ID" value={userDetails.budget_id} onChange={handleChange} required />
                <TextField fullWidth margin="normal" id="name" name="name" label="Name" value={userDetails.name} onChange={handleChange} required />
                <TextField fullWidth margin="normal" id="display_name" name="display_name" label="Display Name" value={userDetails.display_name} onChange={handleChange} required />
                <TextField fullWidth margin="normal" id="employee_id" name="employee_id" label="Employee ID" value={userDetails.employee_id} onChange={handleChange} required />
                <TextField fullWidth margin="normal" id="email" name="email" label="Email" type="email" value={userDetails.email} onChange={handleChange} required />
                <TextField fullWidth margin="normal" id="mobile" name="mobile" label="Mobile" type="number" value={userDetails.mobile} onChange={handleChange} required />
                <TextField fullWidth margin="normal" id="role" name="role" label="Role" value={userDetails.role} onChange={handleChange} required />
                <TextField fullWidth margin="normal" id="submits_to" name="submits_to" label="Submits To" value={userDetails.submits_to} onChange={handleChange} />
                <TextField fullWidth margin="normal" id="approves_and_forwards_too" name="approves_and_forwards_too" label="Approves and Forwards To" value={userDetails.approves_and_forwards_too} onChange={handleChange} />
                <TextField fullWidth margin="normal" id="department" name="department" label="Department" value={userDetails.department} onChange={handleChange} required />
                <TextField fullWidth margin="normal" id="dob" name="dob" label="Date of Birth" type="date" InputLabelProps={{ shrink: true }} value={userDetails.dob} onChange={handleChange} required />
                <TextField select fullWidth margin="normal" id="gender" name="gender" label="Gender" value={userDetails.gender} onChange={handleChange} required>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                </TextField>
                <TextField fullWidth margin="normal" id="doj" name="doj" label="Date of Joining" type="date" InputLabelProps={{ shrink: true }} value={userDetails.doj} onChange={handleChange} required />
                <TextField fullWidth margin="normal" id="designation" name="designation" label="Designation" value={userDetails.designation} onChange={handleChange} required />
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    Add User
                </Button>
            </Box>
        </Container>
    );
};

export { AddUser  };