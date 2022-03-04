const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

class App {
  constructor() {
    this.express = express();
    this.server = require("http").Server(this.express);
    this.io = require("socket.io")(this.server, { cors: { origin: "*" } });
    this.middlewares();
    this.routes();
  }

  middlewares() {
    mongoose.connect(process.env.MONGO_URL);
    this.express.use(morgan("dev"));
    this.express.use(cors());
    this.express.use(express.json());
    this.express.use(
      "/files",
      express.static(path.resolve(__dirname, "..", "uploads", "resized"))
    );
    this.express.use((req, res, next) => {
      req.io = this.io;
      next();
    });
  }

  routes() {
    this.express.use(require("./routes"));
  }
}

module.exports = new App().server;
