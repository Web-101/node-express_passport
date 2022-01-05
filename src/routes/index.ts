import express from "express";

import ensureAuthenticated from "../config/auth";

const router = express.Router();

// home page
router.get("/", (req, res) => {
  res.render("welcome");
});

// dashboard
router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard");
});

export default router;
