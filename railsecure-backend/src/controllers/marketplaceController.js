import MarketplaceListing from "../models/MarketplaceListing.js";
import Ticket from "../models/Ticket.js";

export async function listMarketplace(req, res, next) {
  try {
    const { search, route, cls, minPrice, maxPrice } = req.query;
    const filter = { status: "active" };

    if (route) filter.route = new RegExp(route, "i");
    if (cls) filter.cls = cls;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (search) {
      filter.$or = [
        { route: new RegExp(search, "i") },
        { train: new RegExp(search, "i") },
      ];
    }

    const listings = await MarketplaceListing.find(filter).sort({ createdAt: -1 });
    res.json({
      success: true,
      count: listings.length,
      listings: listings.map((l) => l.toListJSON()),
    });
  } catch (err) {
    next(err);
  }
}

export async function getListing(req, res, next) {
  try {
    const listing = await MarketplaceListing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ success: false, message: "Listing not found" });
    }
    res.json({ success: true, listing: listing.toListJSON() });
  } catch (err) {
    next(err);
  }
}

export async function createListing(req, res, next) {
  try {
    const { ticketId, price } = req.body;
    if (!ticketId || price === undefined) {
      return res.status(400).json({ success: false, message: "ticketId and price are required" });
    }

    const ticket = await Ticket.findOne({ _id: ticketId, userId: req.user._id });
    if (!ticket) {
      return res.status(404).json({ success: false, message: "Ticket not found" });
    }
    if (ticket.isListed) {
      return res.status(400).json({ success: false, message: "Ticket is already listed" });
    }
    if (price > ticket.originalPrice) {
      return res.status(400).json({ success: false, message: "Price cannot exceed original ticket price" });
    }

    const listing = await MarketplaceListing.create({
      ticketId: ticket._id,
      sellerId: req.user._id,
      route: `${ticket.from} → ${ticket.to}`,
      date: `${ticket.date} 2026`,
      train: ticket.train,
      cls: ticket.cls,
      original: ticket.originalPrice,
      price,
      time: ticket.depart,
      seller: req.user.identityVerified ? "Verified" : "Unverified",
    });

    ticket.isListed = true;
    await ticket.save();

    res.status(201).json({ success: true, listing: listing.toListJSON() });
  } catch (err) {
    next(err);
  }
}

export async function purchaseListing(req, res, next) {
  try {
    const listing = await MarketplaceListing.findById(req.params.id);
    if (!listing || listing.status !== "active") {
      return res.status(404).json({ success: false, message: "Listing not available" });
    }

    const ticket = await Ticket.findById(listing.ticketId);
    if (!ticket) {
      return res.status(404).json({ success: false, message: "Ticket not found" });
    }

    ticket.userId = req.user._id;
    ticket.isListed = false;
    await ticket.save();

    listing.status = "sold";
    await listing.save();

    res.json({ success: true, message: "Ticket purchased", ticket: ticket.toListJSON() });
  } catch (err) {
    next(err);
  }
}

export async function cancelListing(req, res, next) {
  try {
    const listing = await MarketplaceListing.findOne({ _id: req.params.id, sellerId: req.user._id });
    if (!listing) {
      return res.status(404).json({ success: false, message: "Listing not found" });
    }

    listing.status = "cancelled";
    await listing.save();

    await Ticket.findByIdAndUpdate(listing.ticketId, { isListed: false });

    res.json({ success: true, message: "Listing cancelled" });
  } catch (err) {
    next(err);
  }
}
