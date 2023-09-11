import dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import logger from 'morgan';
import path from 'path';

import { HttpError, InternalServerError, NotFoundError, Server } from './common/';
import controllers from './controllers';

class ServerInstance {
  app: Application
  db = mongoose.connection;

  constructor() {
    this.app = express();
    this.config();
    this._initDatabaseConnection();
  }

  private config() {
    dotenv.config();

    // set port server
    this.app.set("port", process.env.PORT ?? 3000);

    // add static paths
    this.app.use(express.static(path.join(__dirname, '..', "public")));

    // configure view
    this.app.set("views", path.join(__dirname, "views"));
    this.app.set("view engine", "ejs");

    // use json form parser middlware
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());

    // use logger middlware
    this.app.use(logger("dev"));
  }

  private _routes() {
    new Server(this.app).registerController(controllers);

    // catch 404 and forward to error handler
    this.app.use((_: Request, _R: Response,) => {
      throw new NotFoundError('Not Found')
    });

    this.app.use((err: any, _a: any, res: Response, _b: any) => {
      // Handle known exceptions
      if (err instanceof HttpError) {
        const httpError = err as HttpError;
        return res
          .status(httpError.statusCode)
          .json(httpError.toJSON());
      }

      // Handle unknown exceptions
      if (err instanceof Error) {
        const error = new InternalServerError(`Uncaught Exception ${err.message}`);
        return res.status(500).json(error.toJSON());
      }
    })
  }

  private _initDatabaseConnection(): Promise<typeof mongoose> {
    const URL = process.env.MONGO_URL ?? "mongodb://127.0.0.1:27017";
    const auth: ConnectOptions = {
      user: process.env.MONGO_USER,
      pass: process.env.MONGO_PASSWORD,
      dbName: process.env.MONGO_DB,
    };
    return mongoose.connect(URL, auth)
  }

  startAppInstance() {
    this.app.listen(this.app.get("port"), () => {
      this._routes();
      this.db.on('error', console.error.bind(console, 'MongoDB connection error:'));
      this.db.once('open', () => console.log("Database Connected!"));
      console.log(("App is running at http://localhost:%d in %s mode"), this.app.get("port"), this.app.get("env"));
      console.log("Press CTRL-C to stop\n");
    });
  }
}

const server = new ServerInstance();
server.startAppInstance();