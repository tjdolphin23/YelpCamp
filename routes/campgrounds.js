//========================
// CAMPGROUND ROUTES
//========================
var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var Review = require("../models/review");
var middleware = require("../middleware");


//SHOW ALL CAMPGROUNDS
router.get("/", function(req,res){  
    Campground.find({}, function(err, allCampground){
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampground, page: 'campgrounds'});
        }
    })
});

//CREATE NEW CAMPGROUND
router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var cost = req.body.cost;
    var desc = req.body.description;
    var author ={
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, image: image, cost: cost, description: desc, author: author}
    Campground.create(newCampground, function(err, newlyCreated){
        if(err) {
            console.log(err); 
        } else {
            res.redirect("/campgrounds");
        }
    });
});


//FORM TO CREATE NEW CAMPGROUND
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("campgrounds/new"); 
});

// SHOW MORE INFORMATION ABOUT EXISTING CAMPGROUNDS
router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").populate({
        path: "reviews",
        options: {sort: {createdAt: -1}}
    }).exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground)
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});


// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});


//UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            // deletes all comments associated with the campground
            Comment.remove({"_id": {$in: campground.comments}}, function (err) {
                if (err) {
                    console.log(err);
                    return res.redirect("/campgrounds");
            }
            Review.remove({"_id": {$in: campground.reviews}}, function(err){
                if(err) {
                    console.log(err);
                    return res.redirect("/campgrounds");
                }
                campground.remove();
                req.flash("success", "Campground deleted successfully!");
                res.redirect("/campgrounds");
                });
            });
        }
    });
});



module.exports = router;


























