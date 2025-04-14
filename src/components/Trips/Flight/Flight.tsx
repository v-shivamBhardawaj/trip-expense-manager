import { Typography, Divider } from "@mui/material";

export interface FlightDetails {
    type: string;
    departure_from: string;
    arrival_at: string;
    departure_date: string;
    departure_time: string;
    airline_preference: string;
    _id: string;
    multi_city_flights?: Array<{
        departure_from: string;
        arrival_at: string;
        departure_date: string;
        departure_time: string;
        airline_preference: string;
    }>;
}

const Flight = ({ flight }: { flight: FlightDetails }) => {
    console.log("Received flight prop in Flight component:", flight);

    if (!flight) {
        return <Typography variant="body2">No flight details available</Typography>;
    }

    return (
        <>
            <Typography variant="h6">{flight.type} Flight</Typography>
            <Typography variant="body1"><strong>Departure:</strong> {flight.departure_from}</Typography>
            <Typography variant="body1"><strong>Arrival:</strong> {flight.arrival_at}</Typography>
            <Typography variant="body1"><strong>Departure Date:</strong> {new Date(flight.departure_date).toDateString()}</Typography>
            <Typography variant="body1"><strong>Departure Time:</strong> {flight.departure_time}</Typography>
            <Typography variant="body1"><strong>Airline:</strong> {flight.airline_preference}</Typography>
            <Divider sx={{ my: 2 }} />

            {flight.multi_city_flights && flight.multi_city_flights.length > 0 && (
                <>
                    <Typography variant="h6">Multi-City Flight</Typography>
                    {flight.multi_city_flights.map((segment, index) => (
                        <div key={index} style={{ marginBottom: "10px" }}>
                            <Typography variant="subtitle1">Segment {index + 1}</Typography>
                            <Typography variant="body1"><strong>Departure:</strong> {segment.departure_from}</Typography>
                            <Typography variant="body1"><strong>Arrival:</strong> {segment.arrival_at}</Typography>
                            <Typography variant="body1"><strong>Departure Date:</strong> {new Date(segment.departure_date).toDateString()}</Typography>
                            <Typography variant="body1"><strong>Departure Time:</strong> {segment.departure_time}</Typography>
                            <Typography variant="body1"><strong>Airline:</strong> {segment.airline_preference}</Typography>
                            <Divider sx={{ my: 1 }} />
                        </div>
                    ))}
                </>
            )}
        </>
    );
};

export { Flight };
