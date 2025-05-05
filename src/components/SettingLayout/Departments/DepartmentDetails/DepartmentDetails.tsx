import { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Grid } from "@mui/material";
import { useLocation } from "react-router-dom";
import { APP_NAME } from "constants/commonConstants";

const DepartmentDetails = () => {
  const { state } = useLocation();
  const [userData, setUserData] = useState<any[]>([]);
  const department = state?.department;
  const departmentName = department?.departmentName;

  useEffect(() => {
    if (department) {
      // Fetch all users
      fetch(`/${APP_NAME}/api/user-get`)
        .then((response) => response.json())
        .then((data) => {
          // Filter users based on the department name
          const usersInDepartment = data.filter((user: any) => user.department === department._id);
          setUserData(usersInDepartment);
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [department, departmentName]);

  return (
    <Box sx={{ width: "100%", mt: 3, px: 2 }}>
      {department && (
        <>
          {/* Department Details */}
          <Typography variant="h4" component="div">
            {department.departmentName}
          </Typography>
          <Typography variant="h6" sx={{ color: "text.secondary" }}>
            {department.departmentCode}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            {department.departmentDescription}
          </Typography>
          
          {/* Department Head */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" component="div">
              Department Head:
            </Typography>
            <Card variant="outlined" sx={{ p: 2, mt: 1 }}>
              <CardContent>
                <Typography variant="h6" component="div">
                  {department.departmentHead?.name}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {department.departmentHead?.email}
                </Typography>
              </CardContent>
            </Card>
          </Box>
          
          {/* Users in Department */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Users in this Department:
            </Typography>
            <Grid container spacing={2}>
              {userData.length > 0 ? (
                userData.map((user) => (
                  <Grid item xs={12} sm={6} md={4} key={user._id}>
                    <Card variant="outlined" sx={{ p: 2 }}>
                      <CardContent>
                        <Typography variant="h6" component="div">
                          {user.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                          {user.email}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              ) : (
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  No users found for this department.
                </Typography>
              )}
            </Grid>
          </Box>
        </>
      )}
    </Box>
  );
};

export default DepartmentDetails;
