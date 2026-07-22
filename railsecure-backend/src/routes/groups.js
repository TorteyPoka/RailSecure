import { Router } from "express";
import {
  createGroup,
  joinGroup,
  getGroup,
  listMyGroups,
  getInviteCode,
  confirmMember,
  updateSeats,
  broadcastUpdate,
} from "../controllers/groupController.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.use(protect);
router.get("/", listMyGroups);
router.post("/", createGroup);
router.post("/join", joinGroup);
router.get("/:id", getGroup);
router.get("/:id/invite-code", getInviteCode);
router.post("/:id/members/:memberId/confirm", confirmMember);
router.patch("/:id/seats", updateSeats);
router.post("/:id/broadcast", broadcastUpdate);

export default router;
