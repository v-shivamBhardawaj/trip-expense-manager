import { useEffect, useState } from "react";
import { Box, Card, CardActions, CardContent, Button, Typography, Divider, Grid } from "@mui/material";
import { APP_NAME } from "constants/commonConstants";
import PaginationButton, { PaginationData } from "components/Pagination/PaginationButton";
import { useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 10;

const TripCard = () => {
  const navigate = useNavigate();
  const [tripData, setTripData] = useState<any[]>([]);
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
    fetch(`/${APP_NAME}/api/trip-data`)
      .then((response) => response.json())
      .then((data) => {
        const trips = Array.isArray(data) ? data : []; // Ensure it's always an array
        setTripData(trips);
        updatePagination(trips, 1);
      })
      .catch((error) => console.error("Error fetching trip data:", error));
  }, []);
  

  const updatePagination = (trips: any[], page: number) => {
    const totalRecords = trips.length;
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
    updatePagination(tripData, page);
  };

  return (
    <Box sx={{ width: "100%", mt: 3, px: 2 }}>
      {tripData.slice(paginationInfo.startIndex, paginationInfo.endIndex).map((trip, _index) => (
        <Grid container key={trip.trip_id} spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12}>
            <Card variant="outlined" sx={{ p: 2, display: "flex", justifyContent: "space-between" }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="div">
                  {trip.trip_name}
                </Typography>
                <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                  Trip ID: {trip.trip_id}
                </Typography>

                {/* Domestic Travel */}
                {trip.trip_type === "domestic" && trip.details && (
                  <>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 1 }}>
                      Domestic Travel
                    </Typography>
                    <Typography variant="body2">
                      <strong>Business Purpose:</strong> {trip.details.business_purpose}
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                  </>
                )}

                {/* International Travel */}
                {trip.trip_type === "international" && trip.details && (
                  <>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 1 }}>
                      International Travel
                    </Typography>
                    <Typography variant="body2">
                      <strong>Business Purpose:</strong> {trip.details.business_purpose}
                    </Typography>
                  </>
                )}
              </CardContent>

              <CardActions>
                <Button size="small" onClick={() => navigate(`/tripdetails`, { state: { trip } })}>
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

export default TripCard;
