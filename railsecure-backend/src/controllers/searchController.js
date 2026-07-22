import Ticket from "../models/Ticket.js";
import Tracking from "../models/Tracking.js";

const STATIONS = [
  { name: "Dhaka", code: "DHK" },
  { name: "Chattogram", code: "CTG" },
  { name: "Sylhet", code: "SYL" },
  { name: "Rajshahi", code: "RAJ" },
  { name: "Cox's Bazar", code: "CXB" },
  { name: "Cumilla", code: "CUM" },
  { name: "Feni", code: "FEN" },
];

export async function search(req, res, next) {
  try {
    const { q } = req.query;
    if (!q) {
      return res.json({ success: true, results: { stations: STATIONS, tickets: [], trains: [] } });
    }

    const regex = new RegExp(q, "i");
    const stations = STATIONS.filter((s) => regex.test(s.name));
    const tickets = await Ticket.find({
      userId: req.user._id,
      $or: [{ train: regex }, { from: regex }, { to: regex }, { number: regex }],
    }).limit(10);
    const trains = await Tracking.find({
      $or: [{ train: regex }, { trainNumber: regex }, { route: regex }],
    }).limit(10);

    res.json({
      success: true,
      results: {
        stations,
        tickets: tickets.map((t) => t.toListJSON()),
        trains: trains.map((t) => ({ train: t.train, number: t.trainNumber, route: t.route })),
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function getStation(req, res, next) {
  try {
    const station = STATIONS.find(
      (s) => s.code === req.params.id.toUpperCase() || s.name.toLowerCase() === req.params.id.toLowerCase()
    );
    if (!station) {
      return res.status(404).json({ success: false, message: "Station not found" });
    }
    res.json({
      success: true,
      station: {
        ...station,
        facilities: ["Waiting room", "Ticket counter", "Food court", "Parking"],
        navigation: "Follow platform signs to your coach.",
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function supportChat(req, res) {
  const { message } = req.body;
  res.json({
    success: true,
    reply: message
      ? `Thanks for your question about "${message}". Our AI assistant is ready to help with journey info, stations, and emergency support.`
      : "Hello! How can I help with your journey today?",
  });
}

export async function emergencySupport(req, res) {
  res.json({
    success: true,
    message: "Emergency support request received. A RailSecure agent will contact you shortly.",
    hotline: "+880-1XXX-XXXXXX",
  });
}
