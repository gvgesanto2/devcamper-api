const ErrorResponse = require('../utils/ErrorResponse');

const findResourceById = (ResourceModel, populateOptions) => async (
  req,
  res,
  next,
  resourceId
) => {
  try {
    const query =
      populateOptions && populateOptions !== {}
        ? ResourceModel.findById(resourceId).populate(populateOptions)
        : ResourceModel.findById(resourceId);

    const resource = await query;

    if (!resource) {
      return next(new ErrorResponse('Resource not found with this id'), 404);
    }

    req.resource = resource;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = findResourceById;
