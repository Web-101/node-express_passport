import express from "express";

const router = express.Router();

// home page
router.get("/", (req, res) => {
    res.render("welcome");
})

export default router;