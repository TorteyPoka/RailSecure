import Ticket from "../models/Ticket.js";
import TravelHistory from "../models/TravelHistory.js";
import Wallet from "../models/Wallet.js";
import Group from "../models/Group.js";

export async function getDashboard(req, res, next) {
  try {
    const userId = req.user._id;

    const [tickets, wallet, groupCount, history] = await Promise.all([
      Ticket.find({ userId, lifecycle: { $in: ["Active", "Scheduled"] } }).sort({ createdAt: -1 }),
      Wallet.findOne({ userId }),
      Group.countDocuments({ "members.userId": userId }),
      TravelHistory.find({ userId }).sort({ completedAt: -1 }).limit(5),
    ]);

    const activeTickets = tickets.filter((t) => t.lifecycle === "Active").length;
    const upcomingJourney = tickets[0]?.toListJSON() || null;

    res.json({
      success: true,
      user: { name: req.user.name, avatarInitials: req.user.avatarInitials },
      stats: {
        activeTickets: tickets.length,
        walletBalance: wallet?.balance ?? 0,
        rewardPoints: req.user.rewardPoints,
        groupMembers: groupCount,
      },
      upcomingJourney,
      recentHistory: history.map((h) => h.toListJSON()),
    });
  } catch (err) {
    next(err);
  }
}
