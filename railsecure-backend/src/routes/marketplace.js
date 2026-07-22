import { Router } from "express";
import {
  listMarketplace,
  getListing,
  createListing,
  purchaseListing,
  cancelListing,
} from "../controllers/marketplaceController.js";
import { protect, requireVerified } from "../middleware/auth.js";

const router = Router();

router.get("/", listMarketplace);
router.get("/:id", getListing);

router.use(protect);
router.post("/", requireVerified, createListing);
router.post("/:id/purchase", purchaseListing);
router.delete("/:id", cancelListing);

export default router;
