import mongoose from "mongoose"

const contactMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    subject: { type: String, trim: true },
    phone: { type: String, trim: true },
    message: { type: String, required: true, trim: true },
    status: { type: String, enum: ["new","read","archived"], default: "new" },
    createdAt: { type: Date, default: Date.now }
  },
);

export default mongoose.model("contactMessage", contactMessageSchema);
