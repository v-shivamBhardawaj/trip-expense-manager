import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { APP_NAME } from "constants/commonConstants";

interface RoleDetails {
  _id: string;
  role_name: string;
  role_description: string;
  permissionsNote: string;
  trip: {
    createSubmit: boolean;
    view: string;
    approve: string;
    close: boolean;
    archive: boolean;
    reopen: boolean;
  };
  travel_documents: {
    addModify: boolean;
    allCompanyAccess: string;
  };
  expense_report: {
    createSubmit: boolean;
    view: string;
    approve: string;
    approveViolations: boolean;
    modifySubmitted: boolean;
    reimburse: boolean;
    share: boolean;
    archive: boolean;
    editAfterExport: boolean;
    preventExpenseCreationParent: boolean;
    preventExchangeOverwrite: boolean;
  };
  cards: {
    view: string;
    add: string;
  };
  advance: {
    recordFor: string;
    viewPolicy: boolean;
    approveEmployee: boolean;
    editAfterExport: boolean;
  };
  budget: {
    viewGeneral: boolean;
    addModifyGeneral: boolean;
    viewUser: string;
    addModifyUser: string;
  };
  delegates: {
    allowSubmit: boolean;
    allowApprove: boolean;
  };
  settings: {
    addUsers: boolean;
    preferences: boolean;
    expenseCategories: boolean;
    customers: boolean;
    projects: boolean;
    merchants: boolean;
    currencies: boolean;
    taxes: boolean;
    paymentMode: boolean;
    manageIntegrations: boolean;
    billing: boolean;
  };
  privacy: {
    accessProtectedData: boolean;
  };
}

const RoleInfo = () => {
  const [role, setRole] = useState<RoleDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  useEffect(() => {
    const fetchRoleDetails = async () => {
      if (id) {
        setLoading(true);
        try {
          const response = await fetch(`/${APP_NAME}/api/rolesandpermissionsget`);
          const data = await response.json();
    
          if (data.success) {
            const foundRole = data.data.find((role: RoleDetails) => role._id === id);
            if (foundRole) {
              setRole(foundRole);
            } else {
              console.error("Role not found");
            }
          } else {
            console.error("Failed to fetch role details:", data.message);
          }
        } catch (error) {
          console.error("Failed to fetch role details:", error);
        } finally {
          setLoading(false);
        }
      }
    };    

    fetchRoleDetails();
  }, [id]);

  const handleChange = (path: string, value: any) => {
    if (!role) return;
    const newRole = { ...role };
    const keys = path.split('.');
    let current: any = newRole;

    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }

    current[keys[keys.length - 1]] = value;
    setRole(newRole);
  };

  const handleSubmit = async () => {
    if (role) {
      setLoading(true);
      try {
        const response = await fetch(`/${APP_NAME}/api/rolesandpermissionsput/${role._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(role),
        });
        const data = await response.json();
        if (data.success) {
          alert("Role updated successfully");
        } else {
          alert("Failed to update role");
        }
      } catch (error) {
        alert("Error updating role");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleClose = () => {
    navigate(-1);  // Navigate back to the previous page
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!role) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6">Role not found</Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="center" py={5} bgcolor="#f9f9f9">
      <Paper sx={{ width: 700, p: 4, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          {role.role_name}
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          {role.role_description}
        </Typography>

        <Typography variant="h6" fontWeight="bold" mt={2}>
          Permissions:
        </Typography>

        <Box mt={2}>
          {/* Trip Permissions */}
          <Typography variant="body1">Trip Permissions</Typography>
          <FormControl fullWidth>
            <InputLabel>View</InputLabel>
            <Select
              value={role.trip.view}
              onChange={(e) => handleChange('trip.view', e.target.value)}
            >
              <MenuItem value="None">None</MenuItem>
              <MenuItem value="My Trip">My Trip</MenuItem>
              <MenuItem value="Policy Trip">Policy Trip</MenuItem>
              <MenuItem value="All Company Trips">All Company Trips</MenuItem>
            </Select>
          </FormControl>

          <FormControlLabel
            control={<Checkbox checked={role.trip.createSubmit} onChange={(e) => handleChange('trip.createSubmit', e.target.checked)} />}
            label="Create/Submit"
          />
          <FormControlLabel
            control={<Checkbox checked={role.trip.approve === 'Senior Manager Approval'} onChange={(e) => handleChange('trip.approve', e.target.checked ? 'Senior Manager Approval' : 'Manager')} />}
            label="Approve"
          />
          <FormControlLabel
            control={<Checkbox checked={role.trip.close} onChange={(e) => handleChange('trip.close', e.target.checked)} />}
            label="Close"
          />
          <FormControlLabel
            control={<Checkbox checked={role.trip.archive} onChange={(e) => handleChange('trip.archive', e.target.checked)} />}
            label="Archive"
          />
          <FormControlLabel
            control={<Checkbox checked={role.trip.reopen} onChange={(e) => handleChange('trip.reopen', e.target.checked)} />}
            label="Reopen"
          />

          {/* Travel Documents Permissions */}
          <Typography variant="body1" mt={2}>Travel Documents Permissions</Typography>
          <FormControlLabel
            control={<Checkbox checked={role.travel_documents.addModify} onChange={(e) => handleChange('travel_documents.addModify', e.target.checked)} />}
            label="Add/Modify Travel Documents"
          />
          <FormControl fullWidth>
            <InputLabel>All Company Access</InputLabel>
            <Select
              value={role.travel_documents.allCompanyAccess}
              onChange={(e) => handleChange('travel_documents.allCompanyAccess', e.target.value)}
            >
              <MenuItem value="None">None</MenuItem>
              <MenuItem value="No Access">No Access</MenuItem>
              <MenuItem value="Only View Access">Only View Access</MenuItem>
              <MenuItem value="Add and Modify Access">Add and Modify Access</MenuItem>
            </Select>
          </FormControl>

          {/* Expense Report Permissions */}
          <Typography variant="body1" mt={2}>Expense Report Permissions</Typography>
          <FormControlLabel
            control={<Checkbox checked={role.expense_report.createSubmit} onChange={(e) => handleChange('expense_report.createSubmit', e.target.checked)} />}
            label="Create/Submit"
          />
          <FormControl fullWidth>
            <InputLabel>View</InputLabel>
            <Select
              value={role.expense_report.view}
              onChange={(e) => handleChange('expense_report.view', e.target.value)}
            >
              <MenuItem value="None">None</MenuItem>
              <MenuItem value="My Report">My Report</MenuItem>
              <MenuItem value="All Reports">All Reports</MenuItem>
            </Select>
          </FormControl>
          <FormControlLabel
            control={<Checkbox checked={role.expense_report.approve === 'Senior Manager Approval'} onChange={(e) => handleChange('expense_report.approve', e.target.checked ? 'Senior Manager Approval' : 'Manager')} />}
            label="Approve"
          />
          <FormControlLabel
            control={<Checkbox checked={role.expense_report.archive} onChange={(e) => handleChange('expense_report.archive', e.target.checked)} />}
            label="Archive"
          />
          {/* You can add similar checkboxes and select dropdowns for the rest of the fields like approveViolations, etc. */}

          {/* Cards Permissions */}
          <Typography variant="body1" mt={2}>Cards Permissions</Typography>
          <FormControl fullWidth>
            <InputLabel>View</InputLabel>
            <Select
              value={role.cards.view}
              onChange={(e) => handleChange('cards.view', e.target.value)}
            >
              <MenuItem value="None">None</MenuItem>
              <MenuItem value="My Cards">My Cards</MenuItem>
              <MenuItem value="All Cards">All Cards</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Add</InputLabel>
            <Select
              value={role.cards.add}
              onChange={(e) => handleChange('cards.add', e.target.value)}
            >
              <MenuItem value="None">None</MenuItem>
              <MenuItem value="Add">Add</MenuItem>
            </Select>
          </FormControl>

          {/* Advance Permissions */}
          <Typography variant="body1" mt={2}>Advance Permissions</Typography>
          <FormControl fullWidth>
            <InputLabel>Record For</InputLabel>
            <Select
              value={role.advance.recordFor}
              onChange={(e) => handleChange('advance.recordFor', e.target.value)}
            >
              <MenuItem value="None">None</MenuItem>
              <MenuItem value="Employee">Employee</MenuItem>
              <MenuItem value="Manager">Manager</MenuItem>
            </Select>
          </FormControl>
          <FormControlLabel
            control={<Checkbox checked={role.advance.viewPolicy} onChange={(e) => handleChange('advance.viewPolicy', e.target.checked)} />}
            label="View Policy"
          />
          <FormControlLabel
            control={<Checkbox checked={role.advance.approveEmployee} onChange={(e) => handleChange('advance.approveEmployee', e.target.checked)} />}
            label="Approve Employee"
          />
          <FormControlLabel
            control={<Checkbox checked={role.advance.editAfterExport} onChange={(e) => handleChange('advance.editAfterExport', e.target.checked)} />}
            label="Edit After Export"
          />

          {/* Budget Permissions */}
          <Typography variant="body1" mt={2}>Budget Permissions</Typography>
          <FormControlLabel
            control={<Checkbox checked={role.budget.viewGeneral} onChange={(e) => handleChange('budget.viewGeneral', e.target.checked)} />}
            label="View General"
          />
          <FormControlLabel
            control={<Checkbox checked={role.budget.addModifyGeneral} onChange={(e) => handleChange('budget.addModifyGeneral', e.target.checked)} />}
            label="Add/Modify General"
          />
          <FormControl fullWidth>
            <InputLabel>View User</InputLabel>
            <Select
              value={role.budget.viewUser}
              onChange={(e) => handleChange('budget.viewUser', e.target.value)}
            >
              <MenuItem value="None">None</MenuItem>
              <MenuItem value="All Users">All Users</MenuItem>
              <MenuItem value="My User">My User</MenuItem>
            </Select>
          </FormControl>

          {/* Delegates Permissions */}
          <Typography variant="body1" mt={2}>Delegates Permissions</Typography>
          <FormControlLabel
            control={<Checkbox checked={role.delegates.allowSubmit} onChange={(e) => handleChange('delegates.allowSubmit', e.target.checked)} />}
            label="Allow Submit"
          />
          <FormControlLabel
            control={<Checkbox checked={role.delegates.allowApprove} onChange={(e) => handleChange('delegates.allowApprove', e.target.checked)} />}
            label="Allow Approve"
          />

          {/* Settings Permissions */}
          <Typography variant="body1" mt={2}>Settings Permissions</Typography>
          <FormControlLabel
            control={<Checkbox checked={role.settings.addUsers} onChange={(e) => handleChange('settings.addUsers', e.target.checked)} />}
            label="Add Users"
          />
          {/* You can add similar checkboxes for other fields like preferences, expenseCategories, etc. */}

          <Box mt={2} display="flex" justifyContent="center">
            <Button variant="contained" onClick={handleSubmit} sx={{ marginRight: 2 }}>
              Save Changes
            </Button>
            <Button variant="outlined" onClick={handleClose}>
              Close
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default RoleInfo;
