import express from "express";
import { getDashboardStats } from "../controllers/stats.controller.js";

const router = express.Router();

router.get("/overview", getDashboardStats);

export default router;
