import { useEffect, useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  Stack,
  Checkbox,
  ListItemText,
  Select,
  InputLabel,
  FormControl,
  OutlinedInput,
} from "@mui/material";
import axios from "axios";
import { APP_NAME } from "constants/commonConstants";

// Define the type of a user object
interface User {
  _id: string;
  name: string;
  designation: string;
}

const AddDepartment = () => {
  const [departmentName, setDepartmentName] = useState<string>("");
  const [departmentCode, setDepartmentCode] = useState<string>("");
  const [departmentDescription, setDepartmentDescription] = useState<string>("");
  const [departmentHead, setDepartmentHead] = useState<string>("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios
      .get(`/${APP_NAME}/api/user-get`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const payload = {
      departmentName,
      departmentCode,
      departmentHead,
      departmentDescription,
      users: selectedUsers,  // This is already an array of ObjectIds
    };
  
    try {
      const response = await fetch(`/${APP_NAME}/api/department-post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        alert("Department added successfully!");
        setDepartmentName("");
        setDepartmentCode("");
        setDepartmentHead("");
        setDepartmentDescription("");
        setSelectedUsers([]);
      } else {
        console.error("Failed to submit department:", response.statusText);
      }
    } catch (error) {
      console.error("Error while creating department:", error);
    }
  };
  

  const handleClose = () => {
    setDepartmentName("");
    setDepartmentCode("");
    setDepartmentHead("");
    setDepartmentDescription("");
    setSelectedUsers([]);
    console.log("Close button clicked");
  };

  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Add Department
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Department Name"
          variant="outlined"
          value={departmentName}
          onChange={(e) => setDepartmentName(e.target.value)}
          margin="normal"
          required
        />

        <TextField
          fullWidth
          label="Department Code"
          variant="outlined"
          value={departmentCode}
          onChange={(e) => setDepartmentCode(e.target.value)}
          margin="normal"
          required
        />

        <TextField
          fullWidth
          label="Department Description"
          variant="outlined"
          value={departmentDescription}
          onChange={(e) => setDepartmentDescription(e.target.value)}
          margin="normal"
          multiline
          rows={3}
        />

        <TextField
          select
          fullWidth
          label="Department Head"
          value={departmentHead}
          onChange={(e) => setDepartmentHead(e.target.value)}
          margin="normal"
          required
        >
          {users.map((user) => (
            <MenuItem key={user._id} value={user._id}>
              {user.name} ({user.designation})
            </MenuItem>
          ))}
        </TextField>

        <FormControl fullWidth margin="normal">
          <InputLabel id="users-label">Users in Department</InputLabel>
          <Select
            labelId="users-label"
            multiple
            value={selectedUsers}
            onChange={(e) =>
              setSelectedUsers(e.target.value as string[])
            }
            input={<OutlinedInput label="Users in Department" />}
            renderValue={(selected) =>
              users
                .filter((user) => selected.includes(user._id))
                .map((user) => user.name)
                .join(", ")
            }
          >
            {users.map((user) => (
              <MenuItem key={user._id} value={user._id}>
                <Checkbox checked={selectedUsers.includes(user._id)} />
                <ListItemText primary={`${user.name} (${user.designation})`} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Close
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default AddDepartment;
