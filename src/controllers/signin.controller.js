import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bycrypt from "bcrypt";

export const signin = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res
            .status(400)
            .json(new ApiError(400, false, "Email and password are required", []));
    }
    const user = await User.findOne({email});

    if (!user){
        return res
            .status(400)
            .json(new ApiError(404, false, "User not found", []));
    }

    const isPasswordMatch = await bycrypt.compare(password,user.password);

    if (!isPasswordMatch){
        return res
            .status(400)
            .json(new ApiError(401, false, "Invalid Password", []));
    }

    const accessToken = jwt.sign(
        { userId: user._id},
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d"}
    );

    const refreshToken = jwt.sign(
        { userId: user._id},
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d"}
    );

    user.refreshToken = refreshToken;
    await user.save();

res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, "User signed in successfully", {
        accessTokenExpiry: Date.now() + 1000 * 60 * 60 * 24,
        refreshTokenExpiry: Date.now() + 1000 * 60 * 60 * 24 * 7,
        username: user.username,
      })
    );
})