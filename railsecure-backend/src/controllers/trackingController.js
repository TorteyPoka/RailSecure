import Tracking from "../models/Tracking.js";
import Ticket from "../models/Ticket.js";

export async function getTracking(req, res, next) {
  try {
    const ticket = await Ticket.findOne({ _id: req.params.ticketId, userId: req.user._id });
    if (!ticket) {
      return res.status(404).json({ success: false, message: "Ticket not found" });
    }

    let tracking = await Tracking.findOne({ trainNumber: ticket.number });
    if (!tracking) {
      return res.status(404).json({ success: false, message: "Tracking data not available" });
    }

    res.json({ success: true, tracking: tracking.toDetailJSON() });
  } catch (err) {
    next(err);
  }
}

export async function getTimeline(req, res, next) {
  try {
    const ticket = await Ticket.findOne({ _id: req.params.ticketId, userId: req.user._id });
    if (!ticket) {
      return res.status(404).json({ success: false, message: "Ticket not found" });
    }

    const tracking = await Tracking.findOne({ trainNumber: ticket.number });
    if (!tracking) {
      return res.status(404).json({ success: false, message: "Timeline not available" });
    }

    res.json({ success: true, timeline: tracking.timeline });
  } catch (err) {
    next(err);
  }
}

export async function getLiveTracking(req, res, next) {
  try {
    const ticket = await Ticket.findOne({ _id: req.params.ticketId, userId: req.user._id });
    if (!ticket) {
      return res.status(404).json({ success: false, message: "Ticket not found" });
    }

    const tracking = await Tracking.findOne({ trainNumber: ticket.number });
    if (!tracking) {
      return res.status(404).json({ success: false, message: "Live tracking not available" });
    }

    // Simulate slight speed variation for live feel
    const liveSpeed = tracking.currentSpeed + Math.floor(Math.random() * 5) - 2;

    res.json({
      success: true,
      live: {
        ...tracking.toDetailJSON(),
        currentSpeed: Math.max(0, liveSpeed),
        updatedAt: new Date().toISOString(),
      },
    });
  } catch (err) {
    next(err);
  }
}
