import mongoose from "mongoose";

const marketplaceListingSchema = new mongoose.Schema(
  {
    ticketId: { type: mongoose.Schema.Types.ObjectId, ref: "Ticket", required: true },
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    route: { type: String, required: true },
    date: { type: String, required: true },
    train: { type: String, required: true },
    cls: { type: String, required: true },
    original: { type: Number, required: true },
    price: { type: Number, required: true },
    time: { type: String, required: true },
    seller: { type: String, default: "Verified" },
    status: { type: String, enum: ["active", "sold", "cancelled"], default: "active" },
  },
  { timestamps: true }
);

marketplaceListingSchema.pre("validate", function (next) {
  if (this.price > this.original) {
    next(new Error("Price cannot exceed original ticket price"));
  } else {
    next();
  }
});

marketplaceListingSchema.methods.toListJSON = function () {
  return {
    id: this._id,
    route: this.route,
    date: this.date,
    train: this.train,
    cls: this.cls,
    original: this.original,
    price: this.price,
    seller: this.seller,
    time: this.time,
    status: this.status,
  };
};

export default mongoose.model("MarketplaceListing", marketplaceListingSchema);
