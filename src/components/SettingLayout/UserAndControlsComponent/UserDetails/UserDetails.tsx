import { useLocation, useNavigate } from "react-router-dom";
import { Box, Card, CardContent, Button, Typography } from "@mui/material";

const UserDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const user = location.state?.user; 
    
    return (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
            <Card variant="outlined" sx={{ p: 3, width: "50%" }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        {user.display_name}
                    </Typography>
                    <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                        User ID: {user.user_id}
                    </Typography>
                    <Typography variant="body2">
                        <strong>Email:</strong> {user.email}
                    </Typography>
                    <Typography variant="body2">
                        <strong>Role:</strong> {user.role}
                    </Typography>
                </CardContent>
                <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate(-1)}>
                    Go Back
                </Button>
            </Card>
        </Box>
    );
};

export { UserDetails };
