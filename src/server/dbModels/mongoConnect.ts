import mongoose from "mongoose";
import { mongoURI } from "server/constants";



export const mongoConnect = mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("MongoDB connected successfully.");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

