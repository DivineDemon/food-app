const express = require("express");
const { errorHandler } = require("./middleware/errorHandler");

require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");

// App Initialization
const app = express();

// JSON BigInt Parsing Support for Prisma
BigInt.prototype.toJSON = function () {
  return this.toString();
};

// Middleware
app.use(cors());
app.use(errorHandler);
app.use(morgan(process.env.NODE_ENV));
app.use(express.json({ limit: "200mb", extended: true }));
app.use(express.urlencoded({ limit: "200mb", extended: true }));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/item", require("./routes/itemRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/order", require("./routes/orderRoutes"));
app.use("/api/pay", require("./routes/paymentRoutes"));
app.use("/api/category", require("./routes/categoryRoutes"));

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () =>
  console.log(`Server Running on Port: http://localhost:${PORT}/`)
);
