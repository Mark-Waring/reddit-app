import { Strategy } from "passport-jwt";
import passport from "passport";
import query from "./db.conf.js";

//! Cookie Extractor
const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["auth"];
  }
  return token;
};

const jwtOptions = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.SECRET_KEY,
};

passport.use(
  new Strategy(jwtOptions, async (payload, done) => {
    const { user_id } = payload;
    try {
      const [user] = await query(
        "SELECT username, uuid, id FROM user WHERE user.id = ?",
        [user_id]
      );
      if (!user)
        return done(null, false, "User has already cancelled their account.");

      return done(null, user);
    } catch (err) {
      return done(err, false, "Something went wrong, could not authenticate.");
    }
  })
);

export default passport;
