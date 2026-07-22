import "dotenv/config";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import User from "../models/User.js";
import Ticket from "../models/Ticket.js";
import MarketplaceListing from "../models/MarketplaceListing.js";
import Group from "../models/Group.js";
import Wallet from "../models/Wallet.js";
import Notification from "../models/Notification.js";
import TravelHistory from "../models/TravelHistory.js";
import Tracking from "../models/Tracking.js";

async function seed() {
  await connectDB();

  await Promise.all([
    User.deleteMany({}),
    Ticket.deleteMany({}),
    MarketplaceListing.deleteMany({}),
    Group.deleteMany({}),
    Wallet.deleteMany({}),
    Notification.deleteMany({}),
    TravelHistory.deleteMany({}),
    Tracking.deleteMany({}),
  ]);

  const passwordHash = await bcrypt.hash("password123", 10);

  const shayon = await User.create({
    name: "Shayon",
    email: "shayon@railsecure.test",
    phone: "+8801712345678",
    passwordHash,
    avatarInitials: "RZ",
    identityVerified: true,
    nidVerified: true,
    mobileVerified: true,
    emergencyContact: { name: "Family Contact", phone: "+8801812345678" },
    rewardPoints: 1280,
  });

  const nafis = await User.create({
    name: "Nafis",
    email: "nafis@railsecure.test",
    phone: "+8801712345679",
    passwordHash,
    avatarInitials: "NA",
    identityVerified: true,
    mobileVerified: true,
  });

  const sadia = await User.create({
    name: "Sadia",
    email: "sadia@railsecure.test",
    phone: "+8801712345680",
    passwordHash,
    avatarInitials: "SA",
    identityVerified: true,
    mobileVerified: true,
  });

  const rafi = await User.create({
    name: "Rafi",
    email: "rafi@railsecure.test",
    phone: "+8801712345681",
    passwordHash,
    avatarInitials: "RA",
    identityVerified: false,
    mobileVerified: true,
  });

  await Wallet.create({ userId: shayon._id, balance: 2450 });
  await Wallet.create({ userId: nafis._id, balance: 500 });
  await Wallet.create({ userId: sadia._id, balance: 800 });
  await Wallet.create({ userId: rafi._id, balance: 200 });

  const ticket1 = await Ticket.create({
    userId: shayon._id,
    train: "Subarna Express",
    number: "701",
    from: "Dhaka",
    to: "Chattogram",
    stationFrom: "Dhaka Railway Station",
    stationTo: "Chattogram Railway Station",
    date: "18 Jul",
    depart: "07:00",
    arrive: "12:20",
    duration: "5h 20m • Direct",
    coach: "S_NIGDHA",
    seat: "C-12",
    cls: "Snigdha",
    status: "On time",
    lifecycle: "Active",
    progress: 42,
    originalPrice: 805,
  });

  const ticket2 = await Ticket.create({
    userId: shayon._id,
    train: "Padma Express",
    number: "759",
    from: "Dhaka",
    to: "Rajshahi",
    stationFrom: "Dhaka Railway Station",
    stationTo: "Rajshahi Railway Station",
    date: "02 Aug",
    depart: "23:00",
    arrive: "04:30",
    duration: "5h 30m • Direct",
    coach: "AC_B",
    seat: "B-07",
    cls: "AC Seat",
    status: "Scheduled",
    lifecycle: "Scheduled",
    progress: 0,
    originalPrice: 736,
  });

  await TravelHistory.create([
    {
      userId: shayon._id,
      title: "Dhaka → Cox's Bazar",
      meta: "12 Jun 2026 • Cox's Bazar Express",
      amount: 961,
      completedAt: new Date("2026-06-12"),
    },
    {
      userId: shayon._id,
      title: "Dhaka → Sylhet",
      meta: "03 May 2026 • Parabat Express",
      amount: 736,
      completedAt: new Date("2026-05-03"),
    },
  ]);

  await MarketplaceListing.create([
    {
      ticketId: ticket2._id,
      sellerId: shayon._id,
      route: "Dhaka → Chattogram",
      date: "20 Jul 2026",
      train: "Sonar Bangla Express",
      cls: "Snigdha",
      original: 805,
      price: 760,
      time: "07:00",
      seller: "Verified",
    },
    {
      ticketId: ticket2._id,
      sellerId: nafis._id,
      route: "Dhaka → Sylhet",
      date: "22 Jul 2026",
      train: "Parabat Express",
      cls: "AC Seat",
      original: 736,
      price: 700,
      time: "06:30",
      seller: "Verified",
    },
    {
      ticketId: ticket2._id,
      sellerId: sadia._id,
      route: "Dhaka → Rajshahi",
      date: "25 Jul 2026",
      train: "Silk City Express",
      cls: "Shovon Chair",
      original: 405,
      price: 390,
      time: "14:40",
      seller: "Verified",
    },
  ]);

  await Group.create({
    name: "Chattogram Weekend Group",
    inviteCode: "RAIL-7K2P",
    organizerId: shayon._id,
    ticketId: ticket1._id,
    journey: {
      train: "Subarna Express",
      number: "701",
      date: "18 Jul 2026",
      depart: "07:00",
      from: "Dhaka",
      to: "Chattogram",
    },
    members: [
      { userId: shayon._id, name: "You", seat: "C-12", status: "Confirmed", initials: "YO", role: "organizer" },
      { userId: nafis._id, name: "Nafis", seat: "C-13", status: "Confirmed", initials: "NA", role: "member" },
      { userId: sadia._id, name: "Sadia", seat: "C-14", status: "Confirmed", initials: "SA", role: "member" },
      { userId: rafi._id, name: "Rafi", seat: "C-15", status: "Pending", initials: "RA", role: "member" },
    ],
  });

  await Tracking.create({
    trainNumber: "701",
    train: "Subarna Express",
    route: "Dhaka → Chattogram",
    currentSpeed: 78,
    nextStation: "Cumilla",
    eta: "09:42",
    delayStatus: "On time",
    timeline: [
      { station: "Dhaka", time: "07:00", status: "Departed", state: "done" },
      { station: "Airport", time: "07:25", status: "Departed", state: "done" },
      { station: "Cumilla", time: "09:42", status: "Next stop", state: "current" },
      { station: "Feni", time: "10:35", status: "Scheduled", state: "" },
      { station: "Chattogram", time: "12:20", status: "Arrival", state: "" },
    ],
  });

  await Notification.create([
    { userId: shayon._id, message: "Train #701 is on time", type: "travel", read: false },
    { userId: shayon._id, message: "Group member joined", type: "group", read: false },
    { userId: shayon._id, message: "Reward points earned", type: "reward", read: true },
  ]);

  console.log("Database seeded successfully");
  console.log("\nDemo login credentials:");
  console.log("  Email: shayon@railsecure.test");
  console.log("  Password: password123");
  console.log("\nGroup invite code: RAIL-7K2P");

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
