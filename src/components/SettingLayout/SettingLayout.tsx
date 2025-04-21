import { useNavigate } from "react-router-dom";
import { Typography, Grid, Button, Box, Paper } from "@mui/material";

const settingsData = [
  {
    heading: "Organization",
    items: ["Organization Profile", "Currencies", "Taxes", "Tags", "Subscription"],
  },
  {
    heading: "Users and Control",
    items: ["User", "Roles and Permissions", "Departments"],
  },
  {
    heading: "Customization",
    items: ["Modules", "Web Tabs", "PDF Templates", "Email Templates", "SMS Notifications"],
  },
  {
    heading: "Automation",
    items: ["Report Automation", "Workflow Rules", "Actions", "Schedules"],
  },
];

const SettingLayout = () => {
  const navigate = useNavigate();

  const handleNavigate = (name: string) => {
    const path = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    navigate(`/settings/${path}`);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Settings
      </Typography>

      <Grid container spacing={4}>
        {settingsData.map((section) => (
          <Grid item xs={12} md={6} lg={4} key={section.heading}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6" gutterBottom>
                {section.heading}
              </Typography>
              <Box display="flex" flexDirection="column" gap={1}>
                {section.items.map((item) => (
                  <Button
                    key={item}
                    variant="outlined"
                    onClick={() => handleNavigate(item)}
                    sx={{ justifyContent: "flex-start" }}
                  >
                    {item}
                  </Button>
                ))}
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SettingLayout;
