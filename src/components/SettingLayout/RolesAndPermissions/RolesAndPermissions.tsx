import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Box, Card, CardContent, Typography, CircularProgress } from "@mui/material";
import { APP_NAME } from "constants/commonConstants";

interface Role {
  _id: string;
  role_name: string;
  role_description: string;
}

const RolesAndPermissions = () => {
  const navigate = useNavigate();
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch(`/${APP_NAME}/api/rolesandpermissionsget`);
        const data = await response.json();
        if (data.success) {
          setRoles(data.data);   
        } else {
          console.error("Failed to fetch roles:", data.message);
        }
      } catch (error) {
        console.error("Failed to fetch roles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  const handleAddNewRole = () => {
    navigate("/settings/rolesandpermissionform");
  };

  const handleRoleClick = (_roleId: string) => {
    navigate(`/settings/rolesandpermissions/rolesinfo?id=${_roleId}`);
  };

  return (
    <div>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h4">Roles and Permissions</Typography>
        <Button variant="contained" onClick={handleAddNewRole}>
          Add New Role
        </Button>
      </Stack>

      {loading ? (
        <CircularProgress />
      ) : (
        <Box display="flex" flexWrap="wrap" gap={2}>
          {roles.map((role) => (
            <Card 
              key={role._id} 
              sx={{ width: 300, cursor: 'pointer' }} 
              onClick={() => handleRoleClick(role._id)}
            >
              <CardContent>
                <Typography variant="h6">{role.role_name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {role.role_description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </div>
  );
};

export default RolesAndPermissions;
