import path from 'path';
import 'cross-fetch/polyfill';
import express, { RequestHandler } from 'express';
import compression from 'compression';
import { ChunkExtractor } from '@loadable/server';
import { serverRenderer, nonce } from 'server/middlewares';
import { IS_RENDER_TO_STREAM, SERVER_PORT, DEV_HTTPS_SERVER, STATS_FILE_PATH, KEY_FILE_PATH, CERT_FILE_PATH, ERROR_CODE } from 'server/constants';
import { APP_NAME, DIST_DIR, HEALTH_CHECK, IS_DEV, SRC_DIR } from '_webpack/constants';
import http from 'http';
import https from "https";
import fs from "fs";
import { errorHandler } from './middlewares/errorHandler';
import { initStore, RootState } from 'store/store';
import authenticateSSO from './middlewares/authenticateSSO';
import {fetchTripData} from './middlewares/fetchTripData';
import { fetchUsers } from './middlewares/fetchUsers';
import { mongoConnect } from './dbModels/mongoConnect';
import { fetchBudgets } from './middlewares/fetchBudget';
import Trip from './dbModels/trip';
import Budget from './dbModels/budget';
import User from './dbModels/users';
import { fetchExpenses } from './middlewares/fetchExpenses';


const { appLogger } = require('../../src/utils/logger');
const expressSanitizer = require("express-sanitizer");


// Add the morgan middleware
const { PORT = SERVER_PORT } = process.env;
const runServer = async (hotReload?: () => RequestHandler[]) => {
  const app = express();
  const statsFile = path.resolve(STATS_FILE_PATH);
  const chunkExtractor = new ChunkExtractor({ statsFile });
  
  if (IS_DEV) {
    if (hotReload) {
      app.get('/*', [...hotReload()]);
    }
  } else {
    app.get('/sw.js', (_req, res) => {
      res.sendFile(path.join(SRC_DIR, 'sw.js'));
    });
  }

  // Init Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  // Mount express-sanitizer middleware here
  app.use(expressSanitizer());

  let preloadedState: Partial<RootState> = {};
  const store = initStore(preloadedState);
  app
    .use(nonce)
    .use(express.json())
    .use(compression())
    .use(express.static(path.resolve(DIST_DIR)))

  app.get(HEALTH_CHECK, (req, res) => {
    res.send({
      status: res.statusCode,
      message: 'Server is up and running',
      serverUpTime: new Date(),
      ipAddress: req.socket.remoteAddress
    });
    appLogger.info(`Health check of application working fine!!`);
  })

  app.use(`/${APP_NAME}/api/business`,async(req:any,_res:any,next:any)=>{
    try{
      let resp:any = await authenticateSSO(store,req?.headers?.cookie);
      if(resp){
        next();
      }else{
        const error:any = new Error('Unauthorized access');
        error.status = ERROR_CODE.UNAUTHORIZED;  // Set the status code for the error
        next(error);
      }
    }catch(err:any){
      next(err)
    }
  })



/*Trip API Endpoints */

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
    } catch (err: any) {
        console.error("Error in trip-data route:", err);
        next(new Error('Failed to fetch trip data'));
    }
  });

  app.post(`/${APP_NAME}/api/trip-post`, async (req, res) => {
    try {
        console.log("Received Request Body:", JSON.stringify(req.body, null, 2));

        const { trip_id, trip_name, trip_type, details } = req.body;

        if (!trip_id || !trip_name || !trip_type || !details || !details.trip_itinerary) {
            console.log("Missing required fields");
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const newTrip = new Trip({ trip_id, trip_name, trip_type, details });

        await newTrip.save();
        console.log("Trip Saved Successfully!");

        res.status(201).json({ success: true, message: "Trip saved successfully!", trip: newTrip });
    } catch (error) {
        console.error("Error saving trip:", error);
        res.status(500).json({ success: false, message: "Failed to store trip data" });
    }
});



/*User API EndPoints*/

  app.use(`/${APP_NAME}/api/users`, async (_req, res, next) => {
    try {
        const userData = await fetchUsers(); 
        res.status(200).json(userData);
    } catch (err) {
        console.error("Error in users route:", err);
        next(new Error('Failed to fetch and store user data'));
    }
  });


  app.post(`/${APP_NAME}/api/user-post`, async (req, res) => {
    try {
        const userData = req.body; // Get the user data from the request body

        // Check if the user already exists
        const existingUser  = await User.findOne({ user_id: userData.user_id });
        if (existingUser ) {
            return res.status(400).json({ success: false, message: "User  with this ID already exists." });
        }

        // Create a new user instance
        const newUser  = new User(userData);
        await newUser .save(); // Save the user to the database
        res.status(201).json({ success: true, message: "User  added successfully!", user: newUser  });
    } catch (error) {
        console.error("Error saving user:", error);
        res.status(500).json({ success: false, message: "Failed to store user data" });
      }
  });

  app.get(`/${APP_NAME}/api/user-get`, async (_req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ success: false, message: "Failed to fetch user data" });
    }
  });

/*Budget API EndPoints */

app.use(`/${APP_NAME}/api/budgets`, async (_req, res, next) => {
  try {
      const budgetData = await fetchBudgets(); 
      res.status(200).json(budgetData);
  } catch (err) {
      console.error("Error in budgets route:", err);
      next(new Error('Failed to fetch and store budget data'));
  }
});

// Endpoint to create a new budget
app.post(`/${APP_NAME}/api/budget-post`, async (req, res) => {
  try {
      const budgetData = req.body; // Get the budget data from the request body

      // Check if a budget with the same ID already exists
      const existingBudget = await Budget.findOne({ budget_id: budgetData.budget_id });
      if (existingBudget) {
          return res.status(400).json({ success: false, message: "Budget with this ID already exists." });
      }

      // Create a new budget instance
      const newBudget = new Budget(budgetData);
      await newBudget.save(); // Save the budget to the database
      res.status(201).json({ success: true, message: "Budget saved successfully!", budget: newBudget });
  } catch (error) {
      console.error("Error saving budget:", error);
      res.status(500).json({ success: false, message: "Failed to store budget data" });
  }
});

app.get(`/${APP_NAME}/api/budget-get`, async (_req, res) => {
  try {
      // Fetch all budgets from the MongoDB database
      const budgets = await Budget.find(); // This retrieves all budget documents

      if (!Array.isArray(budgets) || budgets.length === 0) {
          console.warn("No budgets found in the database.");
          return res.status(404).json({ success: false, message: "No budgets found." }); // Return 404 if no budgets are found
      }

      res.status(200).json({ success: true, budgets }); // Return the fetched budgets
  } catch (error) {
      console.error("Error fetching budgets:", error);
      res.status(500).json({ success: false, message: "Failed to fetch budget data" }); // Return 500 on error
  }
});

/* EXPENSES API ENDPOINTS */

app.use(`/${APP_NAME}/api/expenses`, async (_req, res, next) => {
  try {
      const expensesData = await fetchExpenses();
      res.status(200).json(expensesData);
  } catch (err) {
      console.error("Error in expenses route:", err);
      next(new Error('Failed to fetch and store expenses data')); 
  }
});
  


mongoConnect

  //*ANY new changes above this line
  app.get('/*', serverRenderer(chunkExtractor));
  const server = http.createServer(app);

  

  app.use(errorHandler);
  if (IS_DEV) {
    // Read the certificate and the private key for the https server options locally
    // STEP 1
    const options = {
      key: fs.readFileSync(KEY_FILE_PATH),
      cert: fs.readFileSync(CERT_FILE_PATH),
    };
    // Create the https server by initializing it with 'options'
    // STEP 2
    https.createServer(options, app).listen(DEV_HTTPS_SERVER, () => {
      appLogger.info(`Application HTTPS server started on port ${DEV_HTTPS_SERVER} and env is ${process.env.NODE_ENV} `);
    });
  }

  // await connectDB();
  server.listen(PORT, () => {
    appLogger.info(`Application Client listening on port ${PORT}! (render to ${IS_RENDER_TO_STREAM ? 'stream' : 'string'}) and env is ${process.env.NODE_ENV}`);
  });
};

if (IS_DEV) {
  (async () => {
    const { hotReload, devMiddlewareInstance } = await import('./middlewares/hotReload');
    devMiddlewareInstance.waitUntilValid(() => {
      runServer(hotReload);
    });
  })();
} else {
  runServer();
}

