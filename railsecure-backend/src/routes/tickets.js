import { Router } from "express";
import {
  listTickets,
  getTicket,
  getTicketQr,
  transferTicket,
  getTravelHistory,
} from "../controllers/ticketController.js";
import { protect, requireVerified } from "../middleware/auth.js";

const router = Router();

router.use(protect);
router.get("/", listTickets);
router.get("/history", getTravelHistory);
router.get("/:id", getTicket);
router.get("/:id/qr", getTicketQr);
router.post("/:id/transfer", requireVerified, transferTicket);

export default router;
