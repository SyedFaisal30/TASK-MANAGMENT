import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Project } from "../models/project.model.js";

export const getUserProjects = asyncHandler(async (req, res, next) => {
    const userID = req.user._id;
    const projects = await Project.find({ user: userID });

    if (!projects || projects.length === 0) {
        return res.status(404).json(new ApiError(404, false,"No Projects found ", []));
    }

    return res
        .status(200)
        .json(new ApiResponse(200, projects, "Projects fetched successfully"));
});