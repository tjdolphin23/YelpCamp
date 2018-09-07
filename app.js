var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


app.get("/", function(req, res){
	res.render("landing");
});


app.get("/campgrounds", function(req,res){
	var campgrounds = [
		{name: "Salmon Creek", image: "https://farm9.staticflickr.com/8444/7930246198_529eb829df.jpg"},
		{name: "Indian Hill", image: "https://farm9.staticflickr.com/8010/7436786986_9972800b37.jpg"},
		{name: "Big Bear", image: "https://farm9.staticflickr.com/8182/7930033862_38c29cc27d.jpg"}
	]	
	res.render("campgrounds", {campgrounds: campgrounds});
});


app.post("/campgrounds", function(req, res){
	//get date form & add to list

	//redirect back to campgrounds page
});


app.get("/campgrounds/new", function(req, res){
	res.render("new.ejs");
})

var PORT = process.env.PORT || 8080;


app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
