import { useEffect, useState } from "react";
import { Box, Card, CardActions, CardContent, Button, Typography, Grid } from "@mui/material";
import { APP_NAME } from "constants/commonConstants";
import PaginationButton, { PaginationData } from "components/Pagination/PaginationButton";
import { useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 10;

interface User {
    user_id: number;
    display_name: string;
    email: string;
    role: string;
}

const Users = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState<User[]>([]);
    const [paginationInfo, setPaginationInfo] = useState<PaginationData>({
        endIndex: 0,
        nextPageLink: "",
        pageNumber: 1,
        previousPageLink: "",
        recordInPages: ITEMS_PER_PAGE,
        startIndex: 0,
        totalPages: 1,
        totalRecords: 0
    });

    useEffect(() => {
        // Fetch users from the API
        fetch(`/${APP_NAME}/api/user-get`)
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched API Data:", data); // Log API response

                if (Array.isArray(data)) {
                    setUsers(data); // Set users since API returns an array
                    updatePagination(data, 1); // Update pagination for the first page
                } else {
                    console.error("Unexpected API response format:", data);
                }
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
            });
    }, []);

    const updatePagination = (users: User[], page: number) => {
        const totalRecords = users.length;
        const totalPages = Math.ceil(totalRecords / ITEMS_PER_PAGE);
        const startIndex = (page - 1) * ITEMS_PER_PAGE;
        const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalRecords);

        setPaginationInfo({
            endIndex,
            nextPageLink: "",
            pageNumber: page,
            previousPageLink: "",
            recordInPages: ITEMS_PER_PAGE,
            startIndex,
            totalPages,
            totalRecords
        });
    };

    const handlePageChange = (newPage: number) => {
        updatePagination(users, newPage); // Update pagination based on the new page
    };

    return (
        <Box sx={{ width: "100%", mt: 3, px: 2 }}>
            {users.length === 0 ? (
                <Typography variant="h6" align="center">
                    No users available.
                </Typography>
            ) : (
                users.slice(paginationInfo.startIndex, paginationInfo.endIndex).map((user) => (
                    <Grid container key={user.user_id} spacing={2} sx={{ mb: 2 }}>
                        <Grid item xs={12}>
                            <Card variant="outlined" sx={{ p: 2, display: "flex", justifyContent: "space-between" }}>
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography variant="h6" component="div">
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
                                <CardActions>
                                    <Button size="small" onClick={() => navigate(`/userdetails`, { state: { user } })}>
                                        View Details
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                ))
            )}

            {paginationInfo.totalPages > 1 && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                    <PaginationButton data={paginationInfo} handlePageChange={handlePageChange} />
                </Box>
            )}
        </Box>
    );
};

export default Users;