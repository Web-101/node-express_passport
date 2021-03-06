import express from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import passport from "passport";

const router = express.Router();

// login page
router.get("/login", (req, res) => {
  res.render("login");
});

// login handle
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
})

// logout handle
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/users/login");
})

// register page
router.get("/register", (req, res) => {
  res.render("register");
});

// register handle
router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;

  type ErrorType = { msg: string };
  let errors: ErrorType[] = [];

  // check required fields
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please fill in all fields" });
  }

  // check password match
  if (password !== password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  // check pass length
  if (password.length < 6) {
    errors.push({ msg: "Password should be at least 6 characters" });
  }

  // if errors
  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2,
    });
  }

  // if valid
  else {
    User.findOne({ email: email }).then((user) => {
      // if user exists
      if (user) {
        errors.push({ msg: "Email already exists" });
        res.render("register", {
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        const newUser = new User({
          name,
          email,
          password,
        });

        // hash password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            // set password to hash
            newUser.password = hash;
            // save user
            newUser
              .save()
              .then(() => {
                req.flash("success_msg", "You are now registered and are able log in");
                res.redirect("/users/login");
              })
              .catch((err: any) => console.log(err)); 
          });
        });
      }
    });
  }
});

export default router;
