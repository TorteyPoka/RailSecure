import jwt from "jsonwebtoken";
import Ticket from "../models/Ticket.js";
import TravelHistory from "../models/TravelHistory.js";
import User from "../models/User.js";

export async function listTickets(req, res, next) {
  try {
    const tickets = await Ticket.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, tickets: tickets.map((t) => t.toListJSON()) });
  } catch (err) {
    next(err);
  }
}

export async function getTicket(req, res, next) {
  try {
    const ticket = await Ticket.findOne({ _id: req.params.id, userId: req.user._id });
    if (!ticket) {
      return res.status(404).json({ success: false, message: "Ticket not found" });
    }
    res.json({ success: true, ticket: ticket.toListJSON() });
  } catch (err) {
    next(err);
  }
}

export async function getTicketQr(req, res, next) {
  try {
    const ticket = await Ticket.findOne({ _id: req.params.id, userId: req.user._id });
    if (!ticket) {
      return res.status(404).json({ success: false, message: "Ticket not found" });
    }

    const qrToken = jwt.sign(
      { ticketId: ticket._id, userId: req.user._id, seat: ticket.seat },
      process.env.JWT_SECRET,
      { expiresIn: "5m" }
    );

    res.json({
      success: true,
      qr: {
        token: qrToken,
        expiresIn: 300,
        train: ticket.train,
        number: ticket.number,
        seat: ticket.seat,
        coach: ticket.coach,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function transferTicket(req, res, next) {
  try {
    const { recipientEmail, recipientPhone } = req.body;
    if (!recipientEmail && !recipientPhone) {
      return res.status(400).json({ success: false, message: "Recipient email or phone is required" });
    }

    const ticket = await Ticket.findOne({ _id: req.params.id, userId: req.user._id });
    if (!ticket) {
      return res.status(404).json({ success: false, message: "Ticket not found" });
    }

    const recipient = await User.findOne(
      recipientEmail ? { email: recipientEmail } : { phone: recipientPhone }
    );
    if (!recipient) {
      return res.status(404).json({ success: false, message: "Recipient not found" });
    }
    if (!recipient.identityVerified) {
      return res.status(403).json({ success: false, message: "Recipient must be identity verified" });
    }

    ticket.userId = recipient._id;
    await ticket.save();

    res.json({ success: true, message: "Ticket transferred", ticket: ticket.toListJSON() });
  } catch (err) {
    next(err);
  }
}

export async function getTravelHistory(req, res, next) {
  try {
    const history = await TravelHistory.find({ userId: req.user._id }).sort({ completedAt: -1 });
    res.json({ success: true, history: history.map((h) => h.toListJSON()) });
  } catch (err) {
    next(err);
  }
}
