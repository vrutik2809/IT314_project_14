// this file only has functions to be used by other files; here...
// function "notfound" and function "errorHandler" will be exported by this file

// Handling the routes that are not created: 
exports.notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};
