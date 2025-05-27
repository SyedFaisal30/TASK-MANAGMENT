import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    
    const token = req.cookies.accessToken ||
    (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : null);

    if(!token){
        return res.status(401).json(new ApiError(401, false, "Please login to continue", []));
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken.userId).select("-password -refreshToken");

    if(!user){
        return res.status(401).json(new ApiError(401, "Invalid Token"));
    }

    req.user = user;
    return next();
})