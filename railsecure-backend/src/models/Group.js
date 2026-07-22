import mongoose from "mongoose";

const groupMemberSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    seat: { type: String, default: "" },
    status: { type: String, enum: ["Confirmed", "Pending"], default: "Pending" },
    initials: { type: String, default: "" },
    role: { type: String, enum: ["organizer", "member"], default: "member" },
  },
  { _id: true }
);

const groupSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    inviteCode: { type: String, required: true, unique: true, uppercase: true },
    organizerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ticketId: { type: mongoose.Schema.Types.ObjectId, ref: "Ticket" },
    journey: {
      train: String,
      number: String,
      date: String,
      depart: String,
      from: String,
      to: String,
    },
    members: [groupMemberSchema],
  },
  { timestamps: true }
);

groupSchema.methods.toDetailJSON = function () {
  return {
    id: this._id,
    name: this.name,
    inviteCode: this.inviteCode,
    journey: this.journey,
    members: this.members.map((m, i) => ({
      id: m._id,
      name: m.name,
      seat: m.seat,
      status: m.status,
      initials: m.initials,
      role: m.role,
      isOrganizer: m.role === "organizer" || i === 0,
    })),
    memberCount: this.members.length,
  };
};

export default mongoose.model("Group", groupSchema);
