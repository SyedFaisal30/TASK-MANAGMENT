import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

export const signup = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  const existingUsername = await User.findOne({ username });
  if (existingUsername) {
    return res
      .status(400)
      .json(new ApiError(400, false, "Username already exists", []));
  }

  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    return res
      .status(400)
      .json(new ApiError(400, false, "Email already exists", []));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    username,
    email,
    password: hashedPassword,
  });

  res
    .status(201)
    .json(new ApiResponse(201, null, "User Created Successfully"));
});
