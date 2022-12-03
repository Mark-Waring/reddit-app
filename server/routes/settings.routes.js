// import express from "express";
// import validateThreadData from "../middleware/validateThreadData.js";
// import { getByUser } from "../models/users.model.js";
// import auth from "../middleware/auth.middleware.js";
// import validateThreadData from "../middleware/validateThreadData.middleware.js";
// const router = express.Router();

// router.put("/add", auth, validateThreadData, async (req, res) => {
//   const thread = { ...req.body, user_id: req.user.id };
//   const resObj = await saveThread(thread);
//   return res.send(resObj);
// });

// router.get("/", auth, async (req, res) => {
//   const resObj = await getByUser(req.user.id);
//   return res.send(resObj);
// });

// router.delete("/delete/:id", auth, async (req, res) => {
//   const { id } = req.params;
//   const resObj = await removeSaved(req.user.id, id);
//   return res.send(resObj);
// });

// export default router;
