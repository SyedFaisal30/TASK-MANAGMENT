import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["todo", "in-progress", "completed"],
      default: "todo",
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: [true, "Project reference is required"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    dueDate: Date,
  },
  {
    timestamps: true,
  }
);

export const Task = mongoose.model("Task", taskSchema);
