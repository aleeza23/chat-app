import express from "express";
import {
	authController,
	getUsersController,
	loginController,
	registerController,
} from "../controllers/user.controller.js";
import protectRoute from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/me", protectRoute, authController);
router.get("/users", protectRoute, getUsersController);

export default router;
