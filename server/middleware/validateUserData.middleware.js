/**
 * Middleware what validates length of username and password for logging in or registering
 *
 * @param {Request} req - Express Request Object
 * @param {Response} res - Express Response Object
 * @param {next} next - Express next telling to move out of this middleware
 * @returns {Promise<Object>}Either next (to move on to route handler) or sends appropriate error response
 */
export default function validateUserData(req, res, next) {
  const { username, password } = req.body;
  if (!username || username.length < 4 || username.length > 20) {
    return res.send({
      error: "Username must be between 4 and 20 characters",
      success: false,
    });
  }
  if (!password || password.length < 8 || password.length > 20) {
    return res.send({
      error: "Password must be between 8 and 20 characters",
      success: false,
    });
  }
  return next();
}
