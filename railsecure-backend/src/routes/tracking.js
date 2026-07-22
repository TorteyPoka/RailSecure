import { Router } from "express";
import { getTracking, getTimeline, getLiveTracking } from "../controllers/trackingController.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.use(protect);
router.get("/:ticketId", getTracking);
router.get("/:ticketId/timeline", getTimeline);
router.get("/:ticketId/live", getLiveTracking);

export default router;
