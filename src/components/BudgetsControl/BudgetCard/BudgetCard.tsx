import { useEffect, useState } from "react";
import { Box, Card, CardActions, CardContent, Button, Typography, Divider, Grid } from "@mui/material";
import { APP_NAME } from "constants/commonConstants";
import PaginationButton, { PaginationData } from "components/Pagination/PaginationButton";
import { useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 10;

const BudgetCard = () => {
  const navigate = useNavigate();
  const [budgetData, setBudgetData] = useState<any[]>([]);
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
    fetch(`/${APP_NAME}/api/budgets`)
      .then((response) => response.json())
      .then((data) => {
        const budgets = Array.isArray(data) ? data : []; // Ensure it's always an array
        setBudgetData(budgets);
        updatePagination(budgets, 1);
      })
      .catch((error) => console.error("Error fetching budget data:", error));
  }, []);

  const updatePagination = (budgets: any[], page: number) => {
    const totalRecords = budgets.length;
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

  const handlePageChange = (page: number) => {
    updatePagination(budgetData, page);
  };

  return (
    <Box sx={{ width: "100%", mt: 3, px: 2 }}>
      {budgetData.slice(paginationInfo.startIndex, paginationInfo.endIndex).map((budget, _index) => (
        <Grid container key={budget.budget_id} spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12}>
            <Card variant="outlined" sx={{ p: 2, display: "flex", justifyContent: "space-between" }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="div">
                  {budget.budget_category}
                </Typography>
                <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                  Budget ID: {budget.budget_id}
                </Typography>
                <Typography variant="body2">
                  <strong>User Name:</strong> {budget.user_name}
                </Typography>
                <Typography variant="body2">
                  <strong>Fiscal Year:</strong> {budget.fiscal_year}
                </Typography>
                <Typography variant="body2">
                  <strong>Budget Period:</strong> {budget.budget_period}
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Typography variant="body2">
                  <strong>Actuals Tracking Preference:</strong> {budget.actuals_tracking_preference}
                </Typography>
              </CardContent>

              <CardActions>
                <Button size="small" onClick={() => navigate(`/budgetdetails`, { state: { budget } })}>
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      ))}

      {/* Pagination Component */}
      {paginationInfo.totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <PaginationButton data={paginationInfo} handlePageChange={handlePageChange} />
        </Box>
      )}
    </Box>
  );
};

export default BudgetCard;