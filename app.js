"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */

const express = require("express");
const app = express();
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();
const PORT = process.env.PORT || 8000;

/* ------------------------------------------------------- */
// Accept json data:
app.use(express.json());

app.all("/", (req, res) => {
  res.send("WELCOME TO TODO API");
});

/* ------------------------------------------------------- */
// SEQUELIZE:
const { Sequelize, DataTypes } = require("sequelize");

// Connection:
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: process.env.SQLITE || "./db.sqlite3",
});

// Sequelize Model:
const Todo = sequelize.define("todos", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  },
  task: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

/* ------------------------------------------------------- */
/* ------------------------------------------------------- */
/* ------------------------------------------------------- */
/* ------------------------------------------------------- */

const errorHandler = (err, req, res, next) => {
  const errorStatusCode = res.errorStatusCode ?? 500;
  console.log("errorHandler worked.");
  res.status(errorStatusCode).send({
    error: true,
    message: err.message,
    cause: err.cause,
  });
};
app.use(errorHandler);
/* ------------------------------------------------------- */
app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));

// Sync Sequelize models
sequelize
  .sync()
  .then(() => {
    console.log("Database synced.");
  })
  .catch((err) => {
    console.error("Unable to sync the database:", err);
  });
