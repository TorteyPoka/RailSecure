import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    train: { type: String, required: true },
    number: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    stationFrom: { type: String, default: "" },
    stationTo: { type: String, default: "" },
    date: { type: String, required: true },
    depart: { type: String, required: true },
    arrive: { type: String, required: true },
    duration: { type: String, default: "" },
    coach: { type: String, required: true },
    seat: { type: String, required: true },
    cls: { type: String, default: "Snigdha" },
    status: { type: String, default: "Scheduled" },
    lifecycle: { type: String, enum: ["Active", "Scheduled", "Completed", "Cancelled"], default: "Scheduled" },
    progress: { type: Number, default: 0, min: 0, max: 100 },
    originalPrice: { type: Number, default: 0 },
    isListed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

ticketSchema.methods.toListJSON = function () {
  return {
    id: this._id,
    train: this.train,
    number: this.number,
    from: this.from,
    to: this.to,
    stationFrom: this.stationFrom,
    stationTo: this.stationTo,
    date: this.date,
    depart: this.depart,
    arrive: this.arrive,
    duration: this.duration,
    coach: this.coach,
    seat: this.seat,
    cls: this.cls,
    status: this.status,
    lifecycle: this.lifecycle,
    progress: this.progress,
  };
};

export default mongoose.model("Ticket", ticketSchema);
