import { useEffect, useState } from "react";
import { Box, Button, MenuItem, TextField, Typography, Stack, Select, InputLabel, FormControl } from "@mui/material";
import { APP_NAME } from "constants/commonConstants";

const AddReport = () => {
  const [formData, setFormData] = useState({
    trip_id: "",
    user_id: "",
    report_id: "",
    report_name: "",
    start_date: "",
    end_date: "",
    description: "",
    expense_id: "",
  });

  const [trips, setTrips] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [expenses, setExpenses] = useState<any[]>([]);

  // Fetch trips and users data (same as AddExpense)
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await fetch(`/${APP_NAME}/api/trip-get`);
        const data = await res.json();
        setTrips(data);
      } catch (error) {
        console.error("Failed to fetch trips:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const res = await fetch(`/${APP_NAME}/api/user-get`);
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    const fetchExpenses = async () => {
        try {
            const res = await fetch(`/${APP_NAME}/api/expenseget`);
            const data = await res.json();
            setExpenses(data);
        } catch (error) {
            console.error("Failed to fetch expenses:", error);
        }
    }

    fetchTrips();
    fetchUsers();
    fetchExpenses();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add logic to handle the form submission (save report)
  };

  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Create Report
      </Typography>

      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal" required>
          <InputLabel id="trip-label">Trip</InputLabel>
          <Select
            labelId="trip-label"
            name="trip_id"
            value={formData.trip_id}
            onChange={handleChange}
            label="Select Trip"
          >
            <MenuItem value="">Select Trip</MenuItem>
            {trips.map((trip: any) => (
              <MenuItem key={trip._id} value={trip._id}>
                {trip.trip_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal" required>
          <InputLabel id="user-label">User</InputLabel>
          <Select
            labelId="user-label"
            name="user_id"
            value={formData.user_id}
            onChange={handleChange}
            label="Select User"
          >
            <MenuItem value="">Select User</MenuItem>
            {users.map((user: any) => (
              <MenuItem key={user._id} value={user._id}>
                {user.name || user._id}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Report ID"
          variant="outlined"
          name="report_id"
          value={formData.report_id}
          onChange={handleChange}
          margin="normal"
          required
        />

        <TextField
          fullWidth
          label="Report Name"
          variant="outlined"
          name="report_name"
          value={formData.report_name}
          onChange={handleChange}
          margin="normal"
          required
        />

        <label>Start date: </label>
        <TextField
          fullWidth
          variant="outlined"
          type="date"
          name="start_date"
          value={formData.start_date}
          onChange={handleChange}
          margin="normal"
          required
        />

        <label>End date: </label>
        <TextField
          fullWidth
          variant="outlined"
          type="date"
          name="end_date"
          value={formData.end_date}
          onChange={handleChange}
          margin="normal"
          required
        />

        <TextField
          fullWidth
          label="Expense List"
          variant="outlined"
          name="Expense_List"
          value={formData.description}
          onChange={handleChange}
          margin="normal"
        />

        <FormControl fullWidth margin="normal" required>
          <InputLabel id="expense-label">Expense</InputLabel>
          <Select
            labelId="expense-label"
            name="expense_id"
            value={formData.expense_id}
            onChange={handleChange}
            label="Select User"
          >
            <MenuItem value="">Select Expense</MenuItem>
            {expenses.map((expense: any) => (
              <MenuItem key={expense._id} value={expense._id}>
                {expense.category || expense._id}
              </MenuItem>
            ))}
          </Select>
        </FormControl>


        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button type="submit" variant="contained" color="primary">
            Save Report
          </Button>
          <Button variant="outlined" color="secondary" onClick={() => setFormData({
            trip_id: "",
            user_id: "",
            report_id: "",
            report_name: "",
            start_date: "",
            end_date: "",
            description: "",
            expense_id: "",
          })}>
            Reset
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default AddReport;

