/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require("express");
const cors = require("cors");
const contactsRouter = require("./app/routes/contact.route");
const ApiError = require("./app/api-error");

const app = express();

app.use(cors());
app.use(express.json());

// Route gốc nên đặt ở đây
app.get("/", (req, res) => {
	res.json({ message: "Welcome to contact book application." });
});

// Các route chính
app.use("/api/contacts", contactsRouter);

// Middleware xử lý 404
app.use((req, res, next) => {
	return next(new ApiError(404, "Resource not found"));
});

// Middleware xử lý lỗi
app.use((err, req, res, next) => {
	return res.status(err.statusCode || 500).json({
		message: err.message || "Internal Server Error",
	});
});

module.exports = app;
