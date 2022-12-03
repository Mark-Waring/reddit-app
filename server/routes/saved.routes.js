import express from "express";
import validateThreadData from "../middleware/validateThreadData.js";
import { saveThread, removeSaved, getByUser } from "../models/saved.model.js";
import auth from "../middleware/auth.middleware.js";
const router = express.Router();
import { getAuth } from "firebase/auth";
import { app } from "../../src/firebase.config.js";

const auth = getAuth(app);
const user = auth.currentUser;

router.put(`/api/${user}/saved-threads`),
  auth,
  validateThreadData,
  async (req, res) => {
    const thread = { ...req.body, user_id: req.user.id };
    const resObj = await saveThread(thread);
    return res.send(resObj);
  };

export default router;
