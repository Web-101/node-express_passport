import express from "express";

const router = express.Router();

// home page
router.get("/", (req, res) => {
  res.render("welcome");
});

// dashboard
router.get("/dashboard", (req, res) => {
  res.render("dashboard");
})

export default router;
