
//========================
// AUTH ROUTES
//========================
var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var User = require("../models/user");
var passport = require("passport");


//show register form
router.get("/register", function(req, res){
  res.render("register")
});

//HANDLE SIGN UP LOGIC
router.post("/register", function(req, res){
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user){
    if(err) {
      console.log(err);
      return res.render("register");
    }  
    passport.authenticate("local")(req, res, function(){
      res.redirect("/campgrounds");
    });
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
  res.redirect("/campgrounds");
});


function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
};


module.exports = router;
