import { Router } from "express";
import { verifyJWT } from "../middlewares/verifyJWT.middleware.js";
import { createProject } from "../controllers/createproject.controller.js";

const router  = Router();   

router.post("/create-project", verifyJWT, createProject);

export default router