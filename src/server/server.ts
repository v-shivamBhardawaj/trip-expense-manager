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

