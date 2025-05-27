import { Router } from "express";
import { verifyJWT } from "../middlewares/verifyJWT.middleware.js";
import { createProject } from "../controllers/createproject.controller.js";
import { getUserProjects } from "../controllers/getuserprojects.controller.js";

const router  = Router();   

router.post("/create-project", verifyJWT, createProject);

router.get("/get-user-projects", verifyJWT, getUserProjects);

export default router