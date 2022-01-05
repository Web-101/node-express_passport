function ensureAuthenticated(req: any, res: any, next: any) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error_msg", "You are not logged in");
  res.redirect("/users/login");
}

export default ensureAuthenticated;