import Trip from "server/dbModels/trip";

interface ItineraryItem {
    type?: string;
    departure_from?: string;
    arrival_at?: string;
    departure_date?: string;
    departure_time?: string;
    airline_preference?: string;
    location?: string;
    hotel_preference?: string;
    hotel_id?: string;
    check_in_date?: string;
    check_in_time?: string;
    check_out_date?: string;
    check_out_time?: string;
}

interface TripData {
    trip_id: string;
    trip_name: string;
    trip_type: string;
    details: {
        business_purpose: string;
        trip_itinerary: {
            flight?: ItineraryItem;
            hotel?: ItineraryItem;
            bus?: ItineraryItem;
            train?: ItineraryItem;
            car_rental?: ItineraryItem;
        };
    };
    createdAt?: string;
    updatedAt?: string;
}

export const fetchTripData = async (): Promise<TripData[]> => {
    try {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        const response = await fetch('https://dev.yatra.com/trip-expense-manager/api/trip-get');

        if (!response.ok) {
            throw new Error(`Failed to fetch trip data: ${response.status} ${response.statusText}`);
        }

        const tripdata = await response.json();
        console.log("Fetched trip data:", tripdata);

        let trips: TripData[] = Array.isArray(tripdata) ? tripdata : [];

        if (trips.length === 0) {
            console.warn("No trips found in fetched data.");
            return [];
        }

        trips = trips.map(trip => {
            const itinerary = trip.details?.trip_itinerary || {};
            const tripItinerary: { [key: string]: ItineraryItem } = {};

            if (itinerary.flight) {
                tripItinerary.flight = {
                    type: itinerary.flight.type,
                    departure_from: itinerary.flight.departure_from,
                    arrival_at: itinerary.flight.arrival_at,
                    departure_date: itinerary.flight.departure_date,
                    departure_time: itinerary.flight.departure_time,
                    airline_preference: itinerary.flight.airline_preference,
                };
            }

            if (itinerary.hotel) {
                tripItinerary.hotel = {
                    location: itinerary.hotel.location,
                    hotel_preference: itinerary.hotel.hotel_preference,
                    hotel_id: itinerary.hotel.hotel_id,
                    check_in_date: itinerary.hotel.check_in_date,
                    check_in_time: itinerary.hotel.check_in_time,
                    check_out_date: itinerary.hotel.check_out_date,
                    check_out_time: itinerary.hotel.check_out_time,
                };
            }

            // Add similar transformations for bus, train, and car_rental if needed

            return {
                trip_id: trip.trip_id,
                trip_name: trip.trip_name,
                trip_type: trip.trip_type,
                details: {
                    business_purpose: trip.details?.business_purpose || "",
                    trip_itinerary: tripItinerary
                },
                createdAt: trip.createdAt ? new Date(trip.createdAt).toISOString() : new Date().toISOString(),
                updatedAt: trip.updatedAt ? new Date(trip.updatedAt).toISOString() : new Date().toISOString()
            };
        });

        try {
            for (const trip of trips) {
                await Trip.updateOne(
                    { trip_id: trip.trip_id },
                    { $set: trip },
                    { upsert: true }
                );
            }
            console.log("Trips successfully saved to MongoDB.");
            return trips;
        } catch (err) {
            console.error("Error inserting trips:", err);
            return [];
        }
    } catch (error) {
        console.error("Fetch trip data error:", error);
        return [];
    }
};
