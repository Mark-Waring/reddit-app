import express from "express";
import jwt from "jsonwebtoken";
import { login, register } from "../models/users.model.js";
import validateUserData from "../middleware/validateUserData.middleware.js";
const router = express.Router();

router.put("/register", validateUserData, async (req, res) => {
  const { username, password } = req.body;
  const resObj = await register(username, password);
  return res.send(resObj);
});

router.post("/login", validateUserData, async (req, res) => {
  const { username, password } = req.body;
  const resObj = await login(username, password);
  if (!resObj.success) return res.send(resObj);

  const token = jwt.sign({ user_id: resObj.id }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });
  res.cookie("auth", token, { httpOnly: true });

  return res.send({ success: true, data: resObj.data });
});

router.get("/logout", (req, res) => {
  res.clearCookie("auth");
  return res.send({ success: true, data: "Successfully logged out!" });
});

export default router;
