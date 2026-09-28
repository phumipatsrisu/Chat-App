import mongoose, { Document, Types } from "mongoose";

interface IRoom extends Document {
  name: string;
  createdBy: Types.ObjectId;
}

const RoomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

export default mongoose.model<IRoom>("Room", RoomSchema);
