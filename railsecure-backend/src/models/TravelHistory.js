import mongoose from "mongoose";

const travelHistorySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    meta: { type: String, required: true },
    amount: { type: Number, required: true },
    completedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

travelHistorySchema.methods.toListJSON = function () {
  return {
    id: this._id,
    title: this.title,
    meta: this.meta,
    amount: `৳${this.amount}`,
  };
};

export default mongoose.model("TravelHistory", travelHistorySchema);
