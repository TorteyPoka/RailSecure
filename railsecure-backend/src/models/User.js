import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, unique: true, sparse: true, lowercase: true, trim: true },
    phone: { type: String, unique: true, sparse: true, trim: true },
    passwordHash: { type: String, required: true },
    avatarInitials: { type: String, default: "RS" },
    identityVerified: { type: Boolean, default: false },
    nidVerified: { type: Boolean, default: false },
    mobileVerified: { type: Boolean, default: false },
    emergencyContact: {
      name: String,
      phone: String,
    },
    rewardPoints: { type: Number, default: 0 },
    settings: {
      theme: { type: String, enum: ["light", "dark", "system"], default: "dark" },
      language: { type: String, default: "en" },
      privacy: { type: Boolean, default: true },
    },
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.passwordHash);
};

userSchema.methods.toPublicJSON = function () {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    phone: this.phone,
    avatarInitials: this.avatarInitials,
    identityVerified: this.identityVerified,
    nidVerified: this.nidVerified,
    mobileVerified: this.mobileVerified,
    emergencyContact: this.emergencyContact,
    rewardPoints: this.rewardPoints,
    settings: this.settings,
  };
};

export default mongoose.model("User", userSchema);
