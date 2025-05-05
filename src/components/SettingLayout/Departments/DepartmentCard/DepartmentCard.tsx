import { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Grid } from "@mui/material";
import { APP_NAME } from "constants/commonConstants";
import PaginationButton, { PaginationData } from "components/Pagination/PaginationButton";
import { useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 10;

const DepartmentCard = () => {
  const navigate = useNavigate();
  const [departmentData, setDepartmentData] = useState<any[]>([]);
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
    fetch(`/${APP_NAME}/api/department-get`)
      .then((response) => response.json())
      .then((data) => {
        const departments = Array.isArray(data.departments) ? data.departments : [];
        setDepartmentData(departments);
        updatePagination(departments, 1);
      })
      .catch((error) => console.error("Error fetching department data:", error));
  }, []);

  const updatePagination = (departments: any[], page: number) => {
    const totalRecords = departments.length;
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
    updatePagination(departmentData, page);
  };

  const handleCardClick = (department: any) => {
    navigate(`/settings/departmentdetails`, { state: { department } });
  };

  return (
    <Box sx={{ width: "100%", mt: 3, px: 2 }}>
      {departmentData.slice(paginationInfo.startIndex, paginationInfo.endIndex).map((department) => (
        <Grid container key={department._id} spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12}>
            <Card variant="outlined" sx={{ p: 2 }} onClick={() => handleCardClick(department)}>
              <CardContent>
                <Typography variant="h6" component="div">
                  {department.departmentName}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
                  {department.departmentDescription}
                </Typography>
              </CardContent>
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

export default DepartmentCard;
