import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Project } from "../models/project.model.js";

export const createProject = asyncHandler(async (req, res, next) => {
    const { projectname, description } = req.body;

    if (!projectname || !description) {
        return res
            .status(400)
            .json(new ApiError(400, false, "Project name and description are required", []));
    }
    const user = req.user._id;
    const project = await Project.create({
        projectname,
        description,
        user,
    });
    return res
        .status(201)
        .json(new ApiResponse(201, project, "Project created successfully"));
});