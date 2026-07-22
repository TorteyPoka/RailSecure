import { Router } from "express";
import { getWallet, topUp, getTransactions, getRefunds } from "../controllers/walletController.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.use(protect);
router.get("/", getWallet);
router.post("/top-up", topUp);
router.get("/transactions", getTransactions);
router.get("/refunds", getRefunds);

export default router;
