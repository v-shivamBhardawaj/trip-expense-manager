import { Application } from 'express';
import Trip from '../dbModels/trip';
import { fetchTripData } from '../middlewares/fetchTripData';

export const registerTripRoutes = (app: Application, APP_NAME: string) => {
  app.get(`/${APP_NAME}/api/trip-get`, async (_req, res) => {
    try {
      const trips = await Trip.find();
      res.status(200).json(trips);
    } catch (error) {
      console.error("Error fetching trips:", error);
      res.status(500).json({ success: false, message: "Failed to fetch trip data" });
    }
  });

  app.use(`/${APP_NAME}/api/trip-data`, async (_req, res, next) => {
    try {
      const tripData = await fetchTripData();
      res.status(200).json(tripData);
    } catch (err) {
      console.error("Error in trip-data route:", err);
      next(new Error('Failed to fetch trip data'));
    }
  });

  app.post(`/${APP_NAME}/api/trip-post`, async (req, res) => {
    try {
      const { trip_id, trip_name, trip_type, details } = req.body;

      if (!trip_id || !trip_name || !trip_type || !details || !details.trip_itinerary) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
      }

      const newTrip = new Trip({ trip_id, trip_name, trip_type, details });
      await newTrip.save();

      res.status(201).json({ success: true, message: "Trip saved successfully!", trip: newTrip });
    } catch (error) {
      console.error("Error saving trip:", error);
      res.status(500).json({ success: false, message: "Failed to store trip data" });
    }
  });
};
