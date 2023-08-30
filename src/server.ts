import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express, { Application } from 'express';
import logger from 'morgan';
import path from 'path';

import controllers from './controllers';

class ServerInstance {
  app: Application

  constructor() {
    this.app = express();
    this.config();
  }

  private config() {
    dotenv.config();

    // set port server
    this.app.set("port", process.env.PORT || 3000);

    // add static paths
    this.app.use(express.static(path.join(__dirname, "public")));

    // configure view
    this.app.set("views", path.join(__dirname, "views"));
    this.app.set("view engine", "ejs");

    // use logger middlware
    this.app.use(logger("dev"));

    // use json form parser middlware
    this.app.use(bodyParser.json());

    // use query string parser middlware
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));
  }

  private _routes() {
    this.app.use('/api', controllers);
  }

  startAppInstance() {
    this.app.listen(this.app.get("port"), () => {
      this._routes();
      console.log(("App is running at http://localhost:%d in %s mode"), this.app.get("port"), this.app.get("env"));
      console.log("Press CTRL-C to stop\n");
    })
  }
}

const server = new ServerInstance();
server.startAppInstance();