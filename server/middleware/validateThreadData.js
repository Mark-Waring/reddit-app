/**
 * Pulls out thread information, checks for valid information and that the url is valid
 * Sends out an error message with appropriate text if object doesn't fit needed criteria
 *
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {next} next - Next function in express for middleware
 * @returns - Either returns next() to send to the next middleware OR a response with appropriate error
 */

export default function validateThreadData(req, res, next) {
  //   const urlRegex =
  //     /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)(.)/;

  const { url, id } = req.body;
  if (!url || !url.toString().match(urlRegex) || url.length > 64) {
    return res.send({ success: false, error: "Invalid Thread URL" });
  }

  if (!id) {
    return res.send({ success: false, error: "Invalid Data Provided" });
  }
  req.body = { url, id };
  return next();
}
