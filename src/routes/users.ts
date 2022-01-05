import express from "express";

const router = express.Router();

// login page
router.get("/login", (req, res) => {
    res.render("login");
})

// register page
router.get("/register", (req, res) => {
    res.render("register");
})

export default router;