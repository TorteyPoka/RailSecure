import { Router } from "express";
import authRoutes from "./auth.js";
import userRoutes from "./users.js";
import dashboardRoutes from "./dashboard.js";
import ticketRoutes from "./tickets.js";
import trackingRoutes from "./tracking.js";
import marketplaceRoutes from "./marketplace.js";
import groupRoutes from "./groups.js";
import walletRoutes from "./wallet.js";
import notificationRoutes from "./notifications.js";
import searchRoutes from "./search.js";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({ success: true, message: "RailSecure API is running" });
});

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/tickets", ticketRoutes);
router.use("/tracking", trackingRoutes);
router.use("/marketplace", marketplaceRoutes);
router.use("/groups", groupRoutes);
router.use("/wallet", walletRoutes);
router.use("/notifications", notificationRoutes);
router.use("/search", searchRoutes);

export default router;
