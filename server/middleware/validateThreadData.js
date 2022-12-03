/**
 * Pulls out thread information, checks for valid information and that the url is valid
 * Sends out an error message with appropriate text if object doesn't fit needed criteria
 *
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {next} next - Next function in express for middleware
 * @returns - Either returns next() to send to the next middleware OR a response with appropriate error
 */

const restaurantOwnerOnlyMiddleware = (req, res, next) => {
  const user = req.user; // available if you're using Google Firebase Authentication Middleware
  const hasPermission = (user) => true;

  next(); // don't forget this. this will pass the request to the next middleware in the chain
};

export default function validateThreadData(req, res, next) {
  const urlConditions = ["reddit.com/r/", "comments"];
  const isUrlValid = new RegExp(urlConditions.join("|")).test(threadInput);

  if (!hasPermission(restaurantId, user)) {
    res.status(403).send("Unauthorized");
    return;
  }

  const { url, id } = req.body;
  if (!url || !isUrlValid) {
    return res.send({ success: false, error: "Invalid Thread URL" });
  }

  if (!id) {
    return res.send({ success: false, error: "Invalid Data Provided" });
  }
  req.body = { url, id };
  return next();
}
