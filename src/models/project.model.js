import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema(
  {
    projectname: {
      type: String,
      required: [true, "Project name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
  },
  {
    timestamps: true,
  }
);

export const Project = mongoose.model("Project", projectSchema);
