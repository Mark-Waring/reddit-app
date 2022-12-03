import express from "express";
// import userRoutes from "./server/routes/user.routes";
// import savedRoutes from "./server/routes/saved.routes";
// import settingsRoutes from "./server/routes/settings.routes";

const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.static(__dirname + "/build"));
// app.use(express.json());
if (process.env.NODE_ENV === "production") {
  app.enable("trust proxy");
  app.use((req, res, next) => {
    req.secure ? next() : res.redirect("https://" + req.headers.host + req.url);
  });
}
// app.use("/api/users", userRoutes);
// app.use("/api/saved", savedRoutes);
// app.use("/api/settings", settingsRoutes);
app.get("*", (req, res) => {
  return res.sendFile(__dirname + "/build/index.html");
});

app.listen(PORT, () => console.log(`Backend listening on port: ${PORT}`));
