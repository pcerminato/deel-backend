const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./model");
const { getProfile } = require("./middleware/getProfile");
const jobsRouter = require("./jobs/routers");
const contractsRouter = require("./contracts/routers");
const balancesRouter = require("./balances/routers");
const adminRouter = require("./admin/routers");

const app = express();

app.set("sequelize", sequelize);
app.set("models", sequelize.models);

app.get("/_health", (_, res) => {
  res.send("healthy");
});

app.use(bodyParser.json());

app.use(getProfile);

app.use("/admin", adminRouter);

app.use("/balances", balancesRouter);

app.use("/jobs", jobsRouter);

app.use("/contracts", contractsRouter);

app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).end(error);
});

module.exports = app;
