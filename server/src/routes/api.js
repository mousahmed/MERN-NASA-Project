const express = require("express");

const planetsRouter = require("./planets/planets.router");
const LaunchesRouter = require("./launches/launches.router");

const api = express.Router();

api.use("/planets", planetsRouter);
api.use("/launches", LaunchesRouter);

module.exports = api;
