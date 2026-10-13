import express from "express";
import {
	authController,
	loginController,
	registerController,
} from "../controllers/user.controller.js";
import protectRoute from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/me", protectRoute, authController);

export default router;
