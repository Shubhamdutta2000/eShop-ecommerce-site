import express from "express";
const router = express.Router();
import cors from "cors";

import { stripe_checkout } from "../controllers/stripe_checkout.js";

router.use(cors());
router.post("/", stripe_checkout);

export default router;
