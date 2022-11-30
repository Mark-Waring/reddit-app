"use strict";

var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// import userRoutes from "./server/routes/user.routes";
// import savedRoutes from "./server/routes/saved.routes";
// import settingsRoutes from "./server/routes/settings.routes";
// import passport from "./server/config/passport.conf.js";
// import cookieParser from "cookie-parser";

var app = (0, _express.default)();
var PORT = process && process.env && process.env.PORT || undefined || 8080;
app.use(_express.default.static(__dirname + "/build"));
// app.use(express.json());
if ((process && process.env && process.env.NODE_ENV || undefined) === "production") {
  app.enable("trust proxy");
  app.use(function (req, res, next) {
    req.secure ? next() : res.redirect("https://" + req.headers.host + req.url);
  });
}
// // app.use(cookieParser());
// // app.use(passport.initialize());
// app.use("/api/users", userRoutes);
// app.use("/api/saved", savedRoutes);
// app.use("/api/settings", settingsRoutes);
app.get("*", function (req, res) {
  return res.sendFile(__dirname + "/build/index.html");
});
app.listen(PORT, function () {
  return console.log("Backend listening on port: ".concat(PORT));
});