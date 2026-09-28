import mongoose, { Document, Types } from "mongoose";

interface IMessage extends Document {
  content: string;
  sender: Types.ObjectId;
  room: Types.ObjectId;
}

const MessageSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
    },
  },
  { timestamps: true },
);

export default mongoose.model<IMessage>("Message", MessageSchema);
