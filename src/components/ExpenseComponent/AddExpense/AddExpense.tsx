import { useEffect, useState } from "react";
import { Box, Button, MenuItem, TextField, Typography, Stack, Select, InputLabel, FormControl} from "@mui/material";
import { APP_NAME } from "constants/commonConstants";
import mongoose from "mongoose";

const AddExpense = () => {
  const [formData, setFormData] = useState({
    trip_id: "",
    user_id: "",
    category: "",
    amount: "",
    date: "",
    description: "",
  });

  const [trips, setTrips] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    // Fetch trips
    const fetchTrips = async () => {
      try {
        const res = await fetch(`/${APP_NAME}/api/trip-get`);
        const data = await res.json();
        setTrips(data);
      } catch (error) {
        console.error("Failed to fetch trips:", error);
      }
    };

    // Fetch users
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/${APP_NAME}/api/user-get`);
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchTrips();
    fetchUsers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Ensuring the trip_id and user_id are strings representing ObjectIds
    if (!mongoose.Types.ObjectId.isValid(formData.trip_id) || !mongoose.Types.ObjectId.isValid(formData.user_id)) {
      alert("Invalid trip or user ID");
      return;
    }

    try {
      const response = await fetch(`/${APP_NAME}/api/expensepost`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save expense");

      alert("Expense saved successfully");
    } catch (err) {
      console.error(err);
      alert("Error saving expense");
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Add Expense
      </Typography>

      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal" required>
          <InputLabel id="trip-label">Trip</InputLabel>
          <Select
            labelId="trip-label"
            name="trip_id"
            value={formData.trip_id}
            onChange={(e) => handleChange(e as any)}
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
          label="Category"
          variant="outlined"
          name="category"
          value={formData.category}
          onChange={handleChange}
          margin="normal"
          required
        />

        <TextField
          fullWidth
          label="Amount"
          variant="outlined"
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          margin="normal"
          required
        />

        <TextField
          fullWidth
          label=""
          variant="outlined"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          margin="normal"
          required
        />

        <TextField
          fullWidth
          label="Description"
          variant="outlined"
          name="description"
          value={formData.description}
          onChange={handleChange}
          margin="normal"
          multiline
          rows={3}
        />

        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button type="submit" variant="contained" color="primary">
            Save Expense
          </Button>
          <Button variant="outlined" color="secondary" onClick={() => setFormData({
            trip_id: "",
            user_id: "",
            category: "",
            amount: "",
            date: "",
            description: ""
          })}>
            Reset
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default AddExpense;
