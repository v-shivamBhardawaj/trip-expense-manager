import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import DomesticTrip from "../DomesticTrips/DomesticTrip";
import InternationalTrip from "../InternationalTrip/InternationalTrip";

const TripDetails = () => {
  const location = useLocation();
  const tripData = location.state?.trip;

  if (!tripData) {
    return <Typography variant="body2" sx={{ color: "red", mt: 2 }}>No trip details available.</Typography>;
  }

  const { trip_id, trip_name, trip_type, details } = tripData;


  return (
    <>
      <Typography variant="h6" component="div">
        Trip ID: {trip_id}
      </Typography>
      <Typography variant="h6" component="div">
        Trip Name: {trip_name}
      </Typography>

      {trip_type === "domestic" && <DomesticTrip details={details} />}
      {trip_type === "international" && <InternationalTrip details={details} />}
    </>
  );
};

export default TripDetails;
