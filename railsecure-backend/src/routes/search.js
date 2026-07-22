import { Router } from "express";
import { search, getStation, supportChat, emergencySupport } from "../controllers/searchController.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.get("/stations/:id", getStation);
router.post("/support/chat", supportChat);
router.post("/support/emergency", emergencySupport);

router.use(protect);
router.get("/", search);

export default router;
