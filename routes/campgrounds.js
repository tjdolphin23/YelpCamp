//========================
// CAMPGROUND ROUTES
//========================
var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

//SHOW ALL CAMPGROUNDS
router.get("/", function(req,res){	
	Campground.find({}, function(err, allCampground){
		if(err) {
			console.log(err);
		} else {
			res.render("campgrounds/index", {campgrounds: allCampground, currentUser: req.user});
		}
	})
});

//CREATE NEW CAMPGROUND
router.post("/", isLoggedIn, function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = {name: name, image: image, description: desc}
	Campground.create(newCampground, function(err, newlyCreated){
		if(err) {
			console.log(err); 
		} else {
			res.redirect("/campgrounds");
		}
	});
});


//FORM TO CREATE NEW CAMPGROUND
router.get("/new", isLoggedIn, function(req, res){
   res.render("campgrounds/new"); 
});

// SHOW MORE INFORMATION ABOUT EXISTING CAMPGROUNDS
router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground)
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});



//MIDDLEWARE
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
      return next();
    }
    res.redirect("/login");
};


module.exports = router;