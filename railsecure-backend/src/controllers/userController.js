import User from "../models/User.js";

export async function getMe(req, res) {
  res.json({ success: true, user: req.user.toPublicJSON() });
}

export async function updateMe(req, res, next) {
  try {
    const allowed = ["name", "avatarInitials", "emergencyContact"];
    const updates = {};
    for (const key of allowed) {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    }

    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true }).select("-passwordHash");
    res.json({ success: true, user: user.toPublicJSON() });
  } catch (err) {
    next(err);
  }
}

export async function verifyNid(req, res, next) {
  try {
    const { nidNumber } = req.body;
    if (!nidNumber) {
      return res.status(400).json({ success: false, message: "NID number is required" });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { nidVerified: true, identityVerified: true },
      { new: true }
    ).select("-passwordHash");

    res.json({ success: true, user: user.toPublicJSON() });
  } catch (err) {
    next(err);
  }
}

export async function addEmergencyContact(req, res, next) {
  try {
    const { name, phone } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ success: false, message: "Name and phone are required" });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { emergencyContact: { name, phone } },
      { new: true }
    ).select("-passwordHash");

    res.json({ success: true, user: user.toPublicJSON() });
  } catch (err) {
    next(err);
  }
}

export async function getSettings(req, res) {
  res.json({ success: true, settings: req.user.settings });
}

export async function updateSettings(req, res, next) {
  try {
    const { theme, language, privacy } = req.body;
    const settings = { ...req.user.settings.toObject?.() ?? req.user.settings };
    if (theme) settings.theme = theme;
    if (language) settings.language = language;
    if (privacy !== undefined) settings.privacy = privacy;

    const user = await User.findByIdAndUpdate(req.user._id, { settings }, { new: true }).select("-passwordHash");
    res.json({ success: true, settings: user.settings });
  } catch (err) {
    next(err);
  }
}
