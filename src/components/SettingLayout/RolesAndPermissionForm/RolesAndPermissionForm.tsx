import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Button,
  Divider,
  Paper,
  IconButton,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { APP_NAME } from "constants/commonConstants";

const RolesAndPermissionForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  const [formData, setFormData] = useState({
    role_name: "",
    role_description: "",
    permissions: {
      trip: {
        createSubmit: false,
        view: "None",
        approve: "Director",
        close: false,
        archive: false,
        reopen: false,
      },
      travel_documents: {
        addModify: false,
        allCompanyAccess: "None",
      },
      expense_report: {
        createSubmit: false,
        view: "None",
        approve: "None",
        approveViolations: false,
        modifySubmitted: false,
        reimburse: false,
        share: false,
        archive: false,
        editAfterExport: false,
        preventExpenseCreationParent: false,
        preventExchangeOverwrite: false,
      },
      cards: {
        view: "None",
        add: "None",
      },
      advance: {
        recordFor: "None",
        viewPolicy: false,
        approveEmployee: false,
        editAfterExport: false,
      },
      budget: {
        viewGeneral: false,
        addModifyGeneral: false,
        viewUser: "None",
        addModifyUser: "None",
      },
      delegates: {
        allowSubmit: false,
        allowApprove: false,
      },
      settings: {
        addUsers: false,
        preferences: false,
        expenseCategories: false,
        customers: false,
        projects: false,
        merchants: false,
        currencies: false,
        taxes: false,
        paymentMode: false,
        manageIntegrations: false,
        billing: false,
      },
      privacy: {
        accessProtectedData: false,
      },
    },
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRoleDetails = async () => {
      if (id) {
        setLoading(true);
        try {
          const response = await fetch(`/${APP_NAME}/api/rolesandpermissionsget/${id}`);
          const data = await response.json();
          if (response.ok) {
            const fetchedData = data.data;

            // Map API data into your formData structure
            const mappedFormData = {
              role_name: fetchedData.role_name || "",
              role_description: fetchedData.role_description || "",
              permissions: {
                trip: fetchedData.trip || {
                  createSubmit: false,
                  view: "None",
                  approve: "Director",
                  close: false,
                  archive: false,
                  reopen: false,
                },
                travel_documents: fetchedData.travel_documents || {
                  addModify: false,
                  allCompanyAccess: "None",
                },
                expense_report: fetchedData.expense_report || {
                  createSubmit: false,
                  view: "None",
                  approve: "None",
                  approveViolations: false,
                  modifySubmitted: false,
                  reimburse: false,
                  share: false,
                  archive: false,
                  editAfterExport: false,
                  preventExpenseCreationParent: false,
                  preventExchangeOverwrite: false,
                },
                cards: fetchedData.cards || {
                  view: "None",
                  add: "None",
                },
                advance: fetchedData.advance || {
                  recordFor: "None",
                  viewPolicy: false,
                  approveEmployee: false,
                  editAfterExport: false,
                },
                budget: fetchedData.budget || {
                  viewGeneral: false,
                  addModifyGeneral: false,
                  viewUser: "None",
                  addModifyUser: "None",
                },
                delegates: fetchedData.delegates || {
                  allowSubmit: false,
                  allowApprove: false,
                },
                settings: fetchedData.settings || {
                  addUsers: false,
                  preferences: false,
                  expenseCategories: false,
                  customers: false,
                  projects: false,
                  merchants: false,
                  currencies: false,
                  taxes: false,
                  paymentMode: false,
                  manageIntegrations: false,
                  billing: false,
                },
                privacy: fetchedData.privacy || {
                  accessProtectedData: false,
                },
              },
            };

            setFormData(mappedFormData);
          } else {
            console.error("Failed to fetch role details:", data.message);
          }
        } catch (error) {
          console.error("Error fetching role details:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchRoleDetails();
  }, [id]);

  const handleClose = () => {
    navigate(-1);
  };

  const handleCheckboxChange = (
    group: keyof typeof formData.permissions,
    key: string,
    checked: boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [group]: {
          ...prev.permissions[group],
          [key]: checked,
        },
      },
    }));
  };

  const handlePermissionSelectChange = (
    group: keyof typeof formData.permissions,
    key: string,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [group]: {
          ...prev.permissions[group],
          [key]: value,
        },
      },
    }));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const dataToSubmit = {
      role_name: formData.role_name,
      role_description: formData.role_description,
      permissions: formData.permissions,
    };

    try {
      const url = id
        ? `/${APP_NAME}/api/rolesandpermissionsupdate/${id}`
        : `/${APP_NAME}/api/rolesandpermissionspost`;
      const method = id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSubmit),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Roles and permissions saved successfully!");
        navigate("/settings/rolesandpermissions");
      } else {
        alert(result.message || "Failed to save roles and permissions");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form");
    }
  };

  const renderCheckboxGroup = (
    group: keyof typeof formData.permissions,
    options: { key: string; label: string }[]
  ) =>
    options.map(({ key, label }) => (
      <FormControlLabel
        key={key}
        control={
          <Checkbox
            checked={
              formData.permissions[group][
                key as keyof typeof formData.permissions[typeof group]
              ] as boolean
            }
            onChange={(e) =>
              handleCheckboxChange(group, key, e.target.checked)
            }
          />
        }
        label={label}
      />
    ));

  const renderSelect = (
    group: keyof typeof formData.permissions,
    key: string,
    label: string,
    options: string[]
  ) => (
    <FormControl fullWidth margin="normal">
      <InputLabel>{label}</InputLabel>
      <Select
        value={formData.permissions[group][key as keyof typeof formData.permissions[typeof group]] as string}
        onChange={(e) => handlePermissionSelectChange(group, key, e.target.value)}
      >
        {options.map((opt) => (
          <MenuItem key={opt} value={opt}>
            {opt}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="center" py={5} bgcolor="#f9f9f9">
    <Paper sx={{ width: 700, p: 4, borderRadius: 2, position: "relative" }}>
      <IconButton onClick={handleClose} sx={{ position: "absolute", top: 16, right: 16 }}>
        <CloseIcon />
      </IconButton>

      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Roles and Permission Form
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Role Name"
          name="role_name"
          fullWidth
          margin="normal"
          value={formData.role_name}
          onChange={handleChange}
          required
        />
        <TextField
          label="Role Description"
          name="role_description"
          fullWidth
          multiline
          margin="normal"
          value={formData.role_description}
          onChange={handleChange}
        />

        {/* Trip */}
        <Divider sx={{ my: 3 }} />
        <Typography variant="h6">Trip</Typography>
        {renderCheckboxGroup("trip", [
          { key: "createSubmit", label: "Create and Submit Trip" },
          { key: "close", label: "Close Trip" },
          { key: "archive", label: "Archive Trip" },
          { key: "reopen", label: "Reopen Trip" },
        ])}
        {renderSelect("trip", "view", "View Trip", [
          "None",
          "My Trip",
          "Policy Trip",
          "All Company Trips",
        ])}
        {renderSelect("trip", "approve", "Approve Trip", [
          "Director",
          "Manager",
          "All",
        ])}

        {/* Travel Documents */}
        <Divider sx={{ my: 3 }} />
        <Typography variant="h6">Travel Documents</Typography>
        {renderCheckboxGroup("travel_documents", [
          { key: "addModify", label: "Add and Modify My Travel Documents" },
        ])}
        {renderSelect("travel_documents", "allCompanyAccess", "All Company Travel Documents", [
          "None",
          "No Access",
          "Only View Access",
          "Add and Modify Access",
        ])}

        {/* Expense Report */}
        <Divider sx={{ my: 3 }} />
        <Typography variant="h6">Expense Report</Typography>
        {renderCheckboxGroup("expense_report", [
          { key: "createSubmit", label: "Create and Submit Expense Report" },
          { key: "approveViolations", label: "Approve Reports with Policy Violations" },
          { key: "modifySubmitted", label: "Modify Expenses in Submitted Reports" },
          { key: "reimburse", label: "Reimburse Report" },
          { key: "share", label: "Share Report" },
          { key: "archive", label: "Archive Report" },
          { key: "editAfterExport", label: "Edit Reports and Expenses After Export" },
          { key: "preventExpenseCreationParent", label: "Prevent Expense Creation Using Parent Category" },
          { key: "preventExchangeOverwrite", label: "Prevent Overwriting Exchange Rate" },
        ])}
        {renderSelect("expense_report", "view", "View Expense Report", [
          "None",
          "My Expense Report",
          "Policy Expense Report",
          "All Company Expense Report",
        ])}
        {renderSelect("expense_report", "approve", "Approve Expense Report", [
          "None",
          "Director",
          "Manager",
          "All",
        ])}

        {/* Cards */}
        <Divider sx={{ my: 3 }} />
        <Typography variant="h6">Cards</Typography>
        {renderSelect("cards", "view", "View Corporate Card", [
          "None",
          "My Corporate Card",
          "Policy Users Corporate Cards",
          "All Corporate Card",
        ])}
        {renderSelect("cards", "add", "Add Corporate Cards For", [
          "None",
          "Myself",
          "Policy Users",
          "All Corporate Card",
        ])}

        {/* Advance */}
        <Divider sx={{ my: 3 }} />
        <Typography variant="h6">Advance</Typography>
        {renderSelect("advance", "recordFor", "Record Advance For", [
          "None",
          "Myself",
          "Policy Users",
          "All Users",
        ])}
        {renderCheckboxGroup("advance", [
          { key: "viewPolicy", label: "View Policy Advances" },
          { key: "approveEmployee", label: "Approve Employee Advances" },
          { key: "editAfterExport", label: "Edit Advances After Export" },
        ])}

        {/* Budget */}
        <Divider sx={{ my: 3 }} />
        <Typography variant="h6">Budget</Typography>
        <Typography sx={{ fontWeight: "bold", mt: 1 }}>General Budgets</Typography>
        {renderCheckboxGroup("budget", [
          { key: "viewGeneral", label: "View General Budgets" },
          { key: "addModifyGeneral", label: "Add and Modify General Budgets" },
        ])}
        <Typography sx={{ fontWeight: "bold", mt: 1 }}>User Budgets</Typography>
        {renderSelect("budget", "viewUser", "View User Budgets", [
          "None",
          "My Budgets",
          "Policy Users Budgets",
          "All Budgets",
        ])}
        {renderSelect("budget", "addModifyUser", "Add and Modify User Budgets", [
          "None",
          "My Budgets",
          "Policy Users Budgets",
          "All Budgets",
        ])}

        {/* Delegates */}
        <Divider sx={{ my: 3 }} />
        <Typography variant="h6">Delegates</Typography>
        {renderCheckboxGroup("delegates", [
          { key: "allowSubmit", label: "Allow Delegates to Submit Records" },
          { key: "allowApprove", label: "Allow Delegates to Approve Records" },
        ])}

        {/* Settings */}
        <Divider sx={{ my: 3 }} />
        <Typography variant="h6">Settings</Typography>
        {renderCheckboxGroup("settings", [
          { key: "addUsers", label: "Add Users" },
          { key: "preferences", label: "Preferences" },
          { key: "expenseCategories", label: "Expense Categories" },
          { key: "customers", label: "Customers" },
          { key: "projects", label: "Projects" },
          { key: "merchants", label: "Merchants" },
          { key: "currencies", label: "Currencies" },
          { key: "taxes", label: "Taxes" },
          { key: "paymentMode", label: "Payment Mode" },
          { key: "manageIntegrations", label: "Manage Integrations" },
          { key: "billing", label: "Billing" },
        ])}

        {/* Privacy */}
        <Divider sx={{ my: 3 }} />
        <Typography variant="h6">Privacy</Typography>
        {renderCheckboxGroup("privacy", [
          { key: "accessProtectedData", label: "Provide access to protected data" },
        ])}

        <Button variant="contained" color="primary" sx={{ mt: 3 }} type="submit">
          Save
        </Button>
      </form>
    </Paper>
  </Box>
  );
};

export default RolesAndPermissionForm;
