"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var bodyParser = require("body-parser");
var dotenv = require("dotenv");
var express_1 = require("express");
var morgan_1 = require("morgan");
var path = require("path");
var ServerInstance = /** @class */ (function () {
    function ServerInstance() {
        this.app = (0, express_1.default)();
        this.config();
    }
    ServerInstance.prototype.config = function () {
        dotenv.config();
        // set port server
        this.app.set("port", process.env.PORT || 3000);
        // add static paths
        this.app.use(express_1.default.static(path.join(__dirname, "public")));
        // configure view
        this.app.set("views", path.join(__dirname, "views"));
        this.app.set("view engine", "ejs");
        // use logger middlware
        this.app.use((0, morgan_1.default)("dev"));
        // use json form parser middlware
        this.app.use(bodyParser.json());
        // use query string parser middlware
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
    };
    ServerInstance.prototype.startAppInstance = function () {
        var _this = this;
        this.app.listen(300, function () {
            console.log(("App is running at http://localhost:%d in %s mode"), _this.app.get("port"), _this.app.get("env"));
            console.log("Press CTRL-C to stop\n");
        });
    };
    return ServerInstance;
}());
var server = new ServerInstance();
server.startAppInstance();
