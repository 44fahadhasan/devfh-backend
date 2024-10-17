const createError = require("http-errors");

// Not found handler (404)
const notFoundHandler = (req, res, next) => {
  next(
    createError("We’re sorry, because the requested resource was not found!")
  );
};

// Default error handler
const errorHandler = (err, req, res, next) => {
  // Set the response status code
  const status = err.status || 500;

  // Log the error
  console.error({ err });

  // Send the error response
  res.status(status).json({
    status,
    message: err.message || "An unexpected error occurred!",
  });
};

module.exports = {
  notFoundHandler,
  errorHandler,
};
