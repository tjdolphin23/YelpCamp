var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//schema set up
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
// 	name: "Indian Hill",
// 	image: "https://farm9.staticflickr.com/8010/7436786986_9972800b37.jpg"
// }, function(err, campground) {
// 	if(err) {
// 		console.log(err);
// 	} else {
// 		console.log("New campground created!!!");
// 		console.log(campground);
// 	}
// });



app.get("/", function(req, res){
	res.render("landing");
});


app.get("/campgrounds", function(req,res){	
	//get all campgrounds from DB
	Campground.find({}, function(err, allCampground){
		if(err) {
			console.log(err);
		} else {
			res.render("campgrounds", {campgrounds: allCampground});
		}
	})
});


app.post("/campgrounds", function(req, res){
	//get date form & add to list
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image}
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

//local port
var PORT = process.env.PORT || 8080;
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
