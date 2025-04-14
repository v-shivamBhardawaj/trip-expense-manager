import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box, MenuItem, Grid, Card, CardContent } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { APP_NAME } from "constants/commonConstants";

interface ItineraryDetail {
    type: string;
    details: { [key: string]: string | undefined | any[] };
}

interface TripDetails {
    trip_id: string;
    trip_name: string;
    trip_type: string;
    details: {
        business_purpose: string;
        trip_itinerary: ItineraryDetail[];
    };
}

const AddTrip: React.FC = () => {
    const [tripDetails, setTripDetails] = useState<TripDetails>({
        trip_id: Date.now().toString(), // Generate a random ID if not provided
        trip_name: "",
        trip_type: "domestic",
        details: {
            business_purpose: "",
            trip_itinerary: [],
        },
    });

    const [addedItineraryTypes, setAddedItineraryTypes] = useState<Set<string>>(new Set());

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name === "business_purpose") {
            setTripDetails({
                ...tripDetails,
                details: {
                    ...tripDetails.details,
                    [name]: value,
                },
            });
        } else {
            setTripDetails({
                ...tripDetails,
                [name]: value,
            });
        }
    };

    const addTripDetail = (type: string) => {
        if (!addedItineraryTypes.has(type)) {
            setTripDetails({
                ...tripDetails,
                details: {
                    ...tripDetails.details,
                    trip_itinerary: [...tripDetails.details.trip_itinerary, { type, details: {} }],
                },
            });
            setAddedItineraryTypes(new Set(addedItineraryTypes).add(type));
        }
    };

    const handleItineraryChange = (index: number, field: string, value: string) => {
        const updatedItinerary = [...tripDetails.details.trip_itinerary];
        updatedItinerary[index].details[field] = value;
        setTripDetails({
            ...tripDetails,
            details: {
                ...tripDetails.details,
                trip_itinerary: updatedItinerary
            }
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Transform tripDetails to match the MongoDB schema
        const transformedTripDetails = {
            trip_id: tripDetails.trip_id,
            trip_name: tripDetails.trip_name,
            trip_type: tripDetails.trip_type,
            details: {
                business_purpose: tripDetails.details.business_purpose,
                trip_itinerary: {} as { [key: string]: any }
            }
        };

        tripDetails.details.trip_itinerary.forEach(itinerary => {
            const { type, details } = itinerary;
            transformedTripDetails.details.trip_itinerary[type] = {
                ...details,
                departure_date: typeof details.departure_date === 'string' ? new Date(details.departure_date) : undefined,
                return_date: typeof details.return_date === 'string' ? new Date(details.return_date) : undefined,
                check_in_date: typeof details.check_in_date === 'string' ? new Date(details.check_in_date) : undefined,
                check_out_date: typeof details.check_out_date === 'string' ? new Date(details.check_out_date) : undefined,
                pick_up_date: typeof details.pick_up_date === 'string' ? new Date(details.pick_up_date) : undefined,
                drop_off_date: typeof details.drop_off_date === 'string' ? new Date(details.drop_off_date) : undefined,
            };
        });

        try {
            const response = await fetch(`/${APP_NAME}/api/trip-post`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(transformedTripDetails),
            });

            const data = await response.json();
            if (data.success) {
                alert("Trip saved successfully!");

                // Reset form state
                setTripDetails({
                    trip_id: Date.now().toString(),
                    trip_name: "",
                    trip_type: "domestic",
                    details: {
                        business_purpose: "",
                        trip_itinerary: [],
                    },
                });

                // Reset itinerary types
                setAddedItineraryTypes(new Set());
            } else {
                alert("Failed to save trip");
            }
        } catch (error) {
            console.error("Error submitting trip:", error);
            alert("An error occurred while submitting the trip");
        }
    };

    return (
        <Container maxWidth="md">
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Add New Trip
                </Typography>
                <TextField fullWidth margin="normal" label="Trip Name" name="trip_name" value={tripDetails.trip_name} onChange={handleChange} required />
                <TextField fullWidth select margin="normal" label="Trip Type" name="trip_type" value={tripDetails.trip_type} onChange={handleChange} required>
                    <MenuItem value="domestic">Domestic</MenuItem>
                    <MenuItem value="international">International</MenuItem>
                </TextField>

                <Typography variant="h6" gutterBottom>Trip Itinerary</Typography>
                <TextField fullWidth margin="normal" label="Business Purpose" name="business_purpose" value={tripDetails.details.business_purpose} onChange={handleChange} />
                <Grid container spacing={2}>
                    {tripDetails.details.trip_itinerary.map((detail, index) => (
                        <Grid item xs={12} key={index}>
                            <Card>
                                <CardContent>
                                    <Typography variant="body1" gutterBottom>{detail.type}</Typography>
                                    {detail.type === "flight" && (
                                        <>
                                            <TextField fullWidth select margin="normal" label="Flight Type" onChange={(e) => handleItineraryChange(index, "type", e.target.value)} required>
                                                <MenuItem value="one-way">One-Way</MenuItem>
                                                <MenuItem value="round-trip">Round-Trip</MenuItem>
                                                <MenuItem value="multi-city">Multi-City</MenuItem>
                                            </TextField>
                                            <TextField fullWidth margin="normal" label="Departure From" onChange={(e) => handleItineraryChange(index, "departure_from", e.target.value)} required />
                                            <TextField fullWidth margin="normal" label="Arrival At" onChange={(e) => handleItineraryChange(index, "arrival_at", e.target.value)} required />
                                            <TextField fullWidth margin="normal" type="date" label="Departure Date" InputLabelProps={{ shrink: true }} onChange={(e) => handleItineraryChange(index, "departure_date", e.target.value)} required />
                                            <TextField fullWidth margin="normal" type="time" label="Departure Time" InputLabelProps={{ shrink: true }} onChange={(e) => handleItineraryChange(index, "departure_time", e.target.value)} required />
                                            {tripDetails.details.trip_itinerary[index].details.type === "round-trip" && (
                                                <>
                                                    <TextField fullWidth margin="normal" type="date" label="Return Date" InputLabelProps={{ shrink: true }} onChange={(e) => handleItineraryChange(index, "return_date", e.target.value)} />
                                                    <TextField fullWidth margin="normal" type="time" label="Return Time" InputLabelProps={{ shrink: true }} onChange={(e) => handleItineraryChange(index, "return_time", e.target.value)} />
                                                </>
                                            )}
                                            <TextField fullWidth margin="normal" label="Airline Preference" onChange={(e) => handleItineraryChange(index, "airline_preference", e.target.value)} required />

                                            {tripDetails.details.trip_itinerary[index].details.type === "multi-city" && (
                                                <>
                                                    <Typography variant="subtitle1">Multi-City Flights</Typography>
                                                    <Button variant="outlined" onClick={() => {
                                                        let updatedItinerary = [...tripDetails.details.trip_itinerary];
                                                        if (!Array.isArray(updatedItinerary[index].details.multi_city_flights)) {
                                                            updatedItinerary[index].details.multi_city_flights = [];
                                                        }
                                                        (updatedItinerary[index].details.multi_city_flights as any[]).push({});
                                                        setTripDetails({
                                                            ...tripDetails,
                                                            details: {
                                                                ...tripDetails.details,
                                                                trip_itinerary: updatedItinerary
                                                            }
                                                        });
                                                    }}>Add Multi-City Flight</Button>
                                                </>
                                            )}
                                        </>
                                    )}

                                    {detail.type === "hotel" && (
                                        <>
                                            <TextField fullWidth margin="normal" label="Location" onChange={(e) => handleItineraryChange(index, "location", e.target.value)} required />
                                            <TextField fullWidth margin="normal" label="Hotel Preference" onChange={(e) => handleItineraryChange(index, "hotel_preference", e.target.value)} required />
                                            <TextField fullWidth margin="normal" label="Hotel ID" onChange={(e) => handleItineraryChange(index, "hotel_id", e.target.value)} required />
                                            <TextField fullWidth margin="normal" type="date" label="Check-in Date" InputLabelProps={{ shrink: true }} onChange={(e) => handleItineraryChange(index, "check_in_date", e.target.value)} required />
                                            <TextField fullWidth margin="normal" type="time" label="Check-in Time" InputLabelProps={{ shrink: true }} onChange={(e) => handleItineraryChange(index, "check_in_time", e.target.value)} required />
                                            <TextField fullWidth margin="normal" type="date" label="Check-out Date" InputLabelProps={{ shrink: true }} onChange={(e) => handleItineraryChange(index, "check_out_date", e.target.value)} required />
                                            <TextField fullWidth margin="normal" type="time" label="Check-out Time" InputLabelProps={{ shrink: true }} onChange={(e) => handleItineraryChange(index, "check_out_time", e.target.value)} required />
                                        </>
                                    )}

                                    {detail.type === "bus" && (
                                        <>
                                            <TextField fullWidth margin="normal" label="Departure From" onChange={(e) => handleItineraryChange(index, "departure_from", e.target.value)} required />
                                            <TextField fullWidth margin="normal" label="Arrival At" onChange={(e) => handleItineraryChange(index, "arrival_at", e.target.value)} required />
                                            <TextField fullWidth margin="normal" type="date" label="Departure Date" InputLabelProps={{ shrink: true }} onChange={(e) => handleItineraryChange(index, "departure_date", e.target.value)} required />
                                            <TextField fullWidth margin="normal" label="Description" onChange={(e) => handleItineraryChange(index, "description", e.target.value)} />
                                        </>
                                    )}

                                    {detail.type === "train" && (
                                        <>
                                            <TextField fullWidth margin="normal" label="Departure From" onChange={(e) => handleItineraryChange(index, "departure_from", e.target.value)} required />
                                            <TextField fullWidth margin="normal" label="Arrival At" onChange={(e) => handleItineraryChange(index, "arrival_at", e.target.value)} required />
                                            <TextField fullWidth margin="normal" type="date" label="Departure Date" InputLabelProps={{ shrink: true }} onChange={(e) => handleItineraryChange(index, "departure_date", e.target.value)} required />
                                            <TextField fullWidth margin="normal" label="Description" onChange={(e) => handleItineraryChange(index, "description", e.target.value)} />
                                        </>
                                    )}

                                    {detail.type === "car_rental" && (
                                        <>
                                            <TextField fullWidth margin="normal" type="date" label="Pick-up Date" InputLabelProps={{ shrink: true }} onChange={(e) => handleItineraryChange(index, "pick_up_date", e.target.value)} required />
                                            <TextField fullWidth margin="normal" type="time" label="Pick-up Time" InputLabelProps={{ shrink: true }} onChange={(e) => handleItineraryChange(index, "pick_up_time", e.target.value)} required />
                                            <TextField fullWidth margin="normal" label="Pick-up City" onChange={(e) => handleItineraryChange(index, "pick_up_city", e.target.value)} required />
                                            <TextField fullWidth margin="normal" type="date" label="Drop-off Date" InputLabelProps={{ shrink: true }} onChange={(e) => handleItineraryChange(index, "drop_off_date", e.target.value)} required />
                                            <TextField fullWidth margin="normal" type="time" label="Drop-off Time" InputLabelProps={{ shrink: true }} onChange={(e) => handleItineraryChange(index, "drop_off_time", e.target.value)} required />
                                            <TextField fullWidth margin="normal" label="Drop-off City" onChange={(e) => handleItineraryChange(index, "drop_off_city", e.target.value)} required />
                                            <TextField fullWidth margin="normal" label="Car Type" onChange={(e) => handleItineraryChange(index, "car_type", e.target.value)} required />
                                            <TextField fullWidth select margin="normal" label="Driver Needed" onChange={(e) => handleItineraryChange(index, "driver_needed", e.target.value)} required>
                                                <MenuItem value="yes">Yes</MenuItem>
                                                <MenuItem value="no">No</MenuItem>
                                            </TextField>
                                        </>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <Box sx={{ display: "flex", gap: 1, mt: 2, flexWrap: "wrap" }}>
                    {!addedItineraryTypes.has("flight") && (
                        <Button variant="outlined" startIcon={<AddIcon />} onClick={() => addTripDetail("flight")}>
                            Add Flight
                        </Button>
                    )}
                    {!addedItineraryTypes.has("hotel") && (
                        <Button variant="outlined" startIcon={<AddIcon />} onClick={() => addTripDetail("hotel")}>
                            Add Hotel
                        </Button>
                    )}
                    {!addedItineraryTypes.has("bus") && (
                        <Button variant="outlined" startIcon={<AddIcon />} onClick={() => addTripDetail("bus")}>
                            Add Bus
                        </Button>
                    )}
                    {!addedItineraryTypes.has("train") && (
                        <Button variant="outlined" startIcon={<AddIcon />} onClick={() => addTripDetail("train")}>
                            Add Train
                        </Button>
                    )}
                    {!addedItineraryTypes.has("car_rental") && (
                        <Button variant="outlined" startIcon={<AddIcon />} onClick={() => addTripDetail("car_rental")}>
                            Add Car Rental
                        </Button>
                    )}
                </Box>

                <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
                    Submit Trip
                </Button>
            </Box>
        </Container>
    );
};

export { AddTrip };