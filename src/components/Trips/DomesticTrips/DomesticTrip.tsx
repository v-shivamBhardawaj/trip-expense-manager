import { Typography, Divider } from "@mui/material";
import { Flight, FlightDetails } from "../Flight/Flight";

interface TripDetails {
    business_purpose: string;
    trip_itinerary?: {
        flight?: FlightDetails;
        hotel?: {
            location: string;
            hotel_preference: string;
            hotel_id: string;
            check_in_date: string;
            check_in_time: string;
            check_out_date: string;
            check_out_time: string;
        };
    };
}

const DomesticTrip = ({ details }: { details: TripDetails }) => {
    console.log("DomesticTrip received details:", details);

    return (
        <>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 1 }}>
                Domestic Travel
            </Typography>
            <Typography variant="body2">
                <strong>Business Purpose:</strong> {details.business_purpose}
            </Typography>
            <Divider sx={{ my: 1 }} />

            {/* Flight Details */}
            {details.trip_itinerary?.flight ? (
                <>
                    <Typography variant="body2">Rendering Flight Component...</Typography>
                    <Flight key={JSON.stringify(details.trip_itinerary.flight)} flight={details.trip_itinerary.flight} />
                </>
            ) : (
                <Typography variant="body2">No flight details available</Typography>
            )}
        </>
    );
};

export default DomesticTrip;
