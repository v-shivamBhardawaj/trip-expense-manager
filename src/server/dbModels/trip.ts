import mongoose from "mongoose";

const FlightSchema = new mongoose.Schema({
    type: { type: String, enum: ["one-way", "round-trip", "multi-city"], required: true },
    departure_from: { type: String, required: true },
    arrival_at: { type: String, required: true },
    departure_date: { type: Date, required: true },
    departure_time: { type: String, required: true },
    return_date: { type: Date },
    return_time: { type: String },
    airline_preference: { type: String, required: true },
    multi_city_flights: [{
        departure_from: { type: String },
        arrival_at: { type: String },
        departure_date: { type: Date },
        departure_time: { type: String },
        airline_preference: { type: String }
    }]
}, { _id: true });

const HotelSchema = new mongoose.Schema({
    location: { type: String, required: true },
    hotel_preference: { type: String, required: true },
    hotel_id: { type: String, required: true },
    check_in_date: { type: Date, required: true },
    check_in_time: { type: String, required: true },
    check_out_date: { type: Date, required: true },
    check_out_time: { type: String, required: true }
}, { _id: true });

const BusSchema = new mongoose.Schema({
    departure_from: { type: String, required: true },
    arrival_at: { type: String, required: true },
    departure_date: { type: Date, required: true },
    description: { type: String }
}, { _id: true });

const TrainSchema = new mongoose.Schema({
    departure_from: { type: String, required: true },
    arrival_at: { type: String, required: true },
    departure_date: { type: Date, required: true },
    description: { type: String }
}, { _id: true });

const CarRentalSchema = new mongoose.Schema({
    pick_up_date: { type: Date, required: true },
    pick_up_time: { type: String, required: true },
    pick_up_city: { type: String, required: true },
    drop_off_date: { type: Date, required: true },
    drop_off_time: { type: String, required: true },
    drop_off_city: { type: String, required: true },
    car_type: { type: String, required: true },
    driver_needed: { type: Boolean, required: true }
}, { _id: true });

// const TripItinerarySchema = new mongoose.Schema({
//     type: { type: String, enum: ["flight", "hotel", "bus", "train", "car_rental"], required: true },
//     details: { type: mongoose.Schema.Types.Mixed, required: true }
// }, { _id: false });

const TripSchema = new mongoose.Schema({
    trip_id: { type: String, unique: true, required: true },
    trip_name: { type: String, required: true },
    trip_type: { type: String, enum: ["domestic", "international"], required: true },
    details: {
        business_purpose: { type: String, required: true },
        trip_itinerary: {
            flight: { type: FlightSchema },
            hotel: { type: HotelSchema },
            bus: { type: BusSchema },
            train: { type: TrainSchema },
            car_rental: { type: CarRentalSchema }
        }
    }
}, { timestamps: true });

const Trip = mongoose.model("Trip", TripSchema);
export default Trip;
