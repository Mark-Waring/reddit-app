import passport from "passport";

export default function auth(req, res, next) {
  //! Implement my authentication
  passport.authenticate("jwt", (err, user, info) => {
    //! If no user OR there was an error
    if (err || !user)
      return res.send({ error: "Invalid Credentials", success: false });

    req.user = user;
    return next();
  })(req, res, next);
}
