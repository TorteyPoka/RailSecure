import crypto from "crypto";
import Group from "../models/Group.js";
import Ticket from "../models/Ticket.js";

function generateInviteCode() {
  return `RAIL-${crypto.randomBytes(2).toString("hex").toUpperCase()}`;
}

export async function createGroup(req, res, next) {
  try {
    const { name, ticketId } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: "Group name is required" });
    }

    let journey = {};
    if (ticketId) {
      const ticket = await Ticket.findOne({ _id: ticketId, userId: req.user._id });
      if (!ticket) {
        return res.status(404).json({ success: false, message: "Ticket not found" });
      }
      journey = {
        train: ticket.train,
        number: ticket.number,
        date: `${ticket.date} 2026`,
        depart: ticket.depart,
        from: ticket.from,
        to: ticket.to,
      };
    }

    const group = await Group.create({
      name,
      inviteCode: generateInviteCode(),
      organizerId: req.user._id,
      ticketId: ticketId || null,
      journey,
      members: [
        {
          userId: req.user._id,
          name: req.user.name,
          seat: journey.number ? "" : "",
          status: "Confirmed",
          initials: req.user.avatarInitials,
          role: "organizer",
        },
      ],
    });

    res.status(201).json({ success: true, group: group.toDetailJSON() });
  } catch (err) {
    next(err);
  }
}

export async function joinGroup(req, res, next) {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ success: false, message: "Invite code is required" });
    }

    const group = await Group.findOne({ inviteCode: code.toUpperCase() });
    if (!group) {
      return res.status(404).json({ success: false, message: "Invalid invite code" });
    }

    const alreadyMember = group.members.some(
      (m) => m.userId?.toString() === req.user._id.toString()
    );
    if (alreadyMember) {
      return res.status(400).json({ success: false, message: "Already a member of this group" });
    }

    group.members.push({
      userId: req.user._id,
      name: req.user.name,
      seat: "",
      status: req.user.identityVerified ? "Confirmed" : "Pending",
      initials: req.user.avatarInitials,
      role: "member",
    });
    await group.save();

    res.json({ success: true, group: group.toDetailJSON() });
  } catch (err) {
    next(err);
  }
}

export async function getGroup(req, res, next) {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) {
      return res.status(404).json({ success: false, message: "Group not found" });
    }

    const isMember = group.members.some(
      (m) => m.userId?.toString() === req.user._id.toString()
    );
    if (!isMember && group.organizerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not a group member" });
    }

    res.json({ success: true, group: group.toDetailJSON() });
  } catch (err) {
    next(err);
  }
}

export async function listMyGroups(req, res, next) {
  try {
    const groups = await Group.find({
      $or: [{ organizerId: req.user._id }, { "members.userId": req.user._id }],
    }).sort({ updatedAt: -1 });

    res.json({ success: true, groups: groups.map((g) => g.toDetailJSON()) });
  } catch (err) {
    next(err);
  }
}

export async function getInviteCode(req, res, next) {
  try {
    const group = await Group.findOne({ _id: req.params.id, organizerId: req.user._id });
    if (!group) {
      return res.status(404).json({ success: false, message: "Group not found" });
    }
    res.json({ success: true, inviteCode: group.inviteCode });
  } catch (err) {
    next(err);
  }
}

export async function confirmMember(req, res, next) {
  try {
    const group = await Group.findOne({ _id: req.params.id, organizerId: req.user._id });
    if (!group) {
      return res.status(404).json({ success: false, message: "Group not found" });
    }

    const member = group.members.id(req.params.memberId);
    if (!member) {
      return res.status(404).json({ success: false, message: "Member not found" });
    }

    member.status = "Confirmed";
    await group.save();

    res.json({ success: true, group: group.toDetailJSON() });
  } catch (err) {
    next(err);
  }
}

export async function updateSeats(req, res, next) {
  try {
    const { seats } = req.body;
    if (!Array.isArray(seats)) {
      return res.status(400).json({ success: false, message: "seats array is required" });
    }

    const group = await Group.findOne({ _id: req.params.id, organizerId: req.user._id });
    if (!group) {
      return res.status(404).json({ success: false, message: "Group not found" });
    }

    for (const { memberId, seat } of seats) {
      const member = group.members.id(memberId);
      if (member) member.seat = seat;
    }
    await group.save();

    res.json({ success: true, group: group.toDetailJSON() });
  } catch (err) {
    next(err);
  }
}

export async function broadcastUpdate(req, res, next) {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ success: false, message: "Message is required" });
    }

    const group = await Group.findOne({ _id: req.params.id, organizerId: req.user._id });
    if (!group) {
      return res.status(404).json({ success: false, message: "Group not found" });
    }

    res.json({
      success: true,
      message: "Update sent to group members",
      recipients: group.members.length,
    });
  } catch (err) {
    next(err);
  }
}
