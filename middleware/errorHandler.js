const ErrorResponse = require('../utils/ErrorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err, message: err.message };

  // Log to console for dev
  console.log(err.stack.red);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message =
      typeof err.value === 'string'
        ? `Resource not found with the id of ${err.value}`
        : 'Resource not found with this id';
    error = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const [propKey, propValue] = Object.entries(err.keyValue)[0];

    const message = `Duplicate field value entered: there's already a resource with the value of ${propValue} for the property ${propKey} in the database`;
    error = new ErrorResponse(message, 400);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors)
      .map((val) => val.message)
      .reduce((acc, curr) => {
        return (acc += curr + '. ');
      }, 'Validation failed: ');
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  });
};

module.exports = errorHandler;
