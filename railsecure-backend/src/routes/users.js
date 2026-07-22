import { Router } from "express";
import {
  getMe,
  updateMe,
  verifyNid,
  addEmergencyContact,
  getSettings,
  updateSettings,
} from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.use(protect);
router.get("/me", getMe);
router.patch("/me", updateMe);
router.post("/me/verify-nid", verifyNid);
router.post("/me/emergency-contact", addEmergencyContact);
router.get("/me/settings", getSettings);
router.patch("/me/settings", updateSettings);

export default router;
