import express from "express";
const router = express.Router();

import { stripe_checkout } from "../controllers/stripe_checkout.js";

router.post("/", stripe_checkout);

export default router;
