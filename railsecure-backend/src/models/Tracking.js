import mongoose from "mongoose";

const timelineItemSchema = new mongoose.Schema(
  {
    station: { type: String, required: true },
    time: { type: String, required: true },
    status: { type: String, required: true },
    state: { type: String, enum: ["done", "current", ""], default: "" },
  },
  { _id: false }
);

const trackingSchema = new mongoose.Schema(
  {
    trainNumber: { type: String, required: true, unique: true },
    train: { type: String, required: true },
    route: { type: String, required: true },
    currentSpeed: { type: Number, default: 0 },
    nextStation: { type: String, default: "" },
    eta: { type: String, default: "" },
    delayStatus: { type: String, default: "On time" },
    timeline: [timelineItemSchema],
  },
  { timestamps: true }
);

trackingSchema.methods.toDetailJSON = function () {
  return {
    train: this.train,
    number: this.trainNumber,
    route: this.route,
    currentSpeed: this.currentSpeed,
    nextStation: this.nextStation,
    eta: this.eta,
    delayStatus: this.delayStatus,
    timeline: this.timeline,
  };
};

export default mongoose.model("Tracking", trackingSchema);
