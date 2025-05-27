import { Router } from "express";
import { signup } from "../controllers/singup.controller.js";
import { signin } from "../controllers/signin.controller.js";
const router = Router();

router.post("/register", signup);

router.post("/login", signin);

export default router;