var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var seedDB = require("./seeds");


seedDB();
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");



app.get("/", function(req, res){
	res.render("landing");
});


app.get("/campgrounds", function(req,res){	
	//get all campgrounds from DB
	Campground.find({}, function(err, allCampground){
		if(err) {
			console.log(err);
		} else {
			res.render("index", {campgrounds: allCampground});
		}
	})
});


app.post("/campgrounds", function(req, res){
	//get date form & add to list
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = {name: name, image: image, description: desc}
	//create a new campground
	Campground.create(newCampground, function(err, newlyCreated){
		if(err) {
			console.log(err); 
		} else {
			//redirect back to campgrounds page
			res.redirect("/campgrounds");
		}
	});
});


app.get("/campgrounds/new", function(req, res){
	res.render("new.ejs");
});

// show more info about 1 campground
app.get("/campgrounds/:id", function(req, res){
	//find campground with ID
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err) {
			console.log(err);
		} else {
			console.log(foundCampground);
			res.render("show", {campground: foundCampground});
		}
	});
});

//local port
var PORT = process.env.PORT || 8080;
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});






































