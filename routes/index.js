var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var User = require("../models/user");
var passport = require("passport");


// SHOW REGISTER FORM
router.get("/register", function(req, res){
   res.render("register", {page: 'register'}); 
});

//SHOW LOGIN FORM
router.get("/login", function(req, res){
   res.render("login", {page: 'login'}); 
});

//HANDLE SIGN UP LOGIC
router.post("/register", function(req, res){
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user){
    if(err) {
      console.log(err)
      return res.render("register", {error: err.message});
    }  
    passport.authenticate("local")(req, res, function(){
      req.flash("success", "Welcome to YelpCamp " + req.body.username);
      res.redirect("/campgrounds");
    })
  });
});

// SHOW LOGIN FORM
router.get("/login", function(req, res){
  res.render("login");
});

// HANDLE LOGIN LOGIC
router.post("/login", passport.authenticate("local",
  {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
  }), function(req, res) {
});


//LOGOUT ROUTE
router.get("/logout", function(req, res){
  req.logout();
  req.flash("success", "You are logged out!");
  res.redirect("/campgrounds");
});




module.exports = router;

















