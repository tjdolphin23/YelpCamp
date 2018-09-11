var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
		{name: "Salmon Creek", image: "https://farm9.staticflickr.com/8444/7930246198_529eb829df.jpg"},
		{name: "Indian Hill", image: "https://farm9.staticflickr.com/8010/7436786986_9972800b37.jpg"},
		{name: "Big Bear", image: "https://farm9.staticflickr.com/8182/7930033862_38c29cc27d.jpg"}
	];


app.get("/", function(req, res){
	res.render("landing");
});


app.get("/campgrounds", function(req,res){	
	res.render("campgrounds", {campgrounds: campgrounds});
});


app.post("/campgrounds", function(req, res){
	//get date form & add to list
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image}
	campgrounds.push(newCampground);
	//redirect back to campgrounds page
	res.redirect("/campgrounds");
});


app.get("/campgrounds/new", function(req, res){
	res.render("new.ejs");
});

//local port
var PORT = process.env.PORT || 8080;
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
