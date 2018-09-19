var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
	{
		name: "Cloud's Rest",
		image: "https://pixabay.com/get/eb33b80d28f1093ed1584d05fb1d4e97e07ee3d21cac104496f7c27ea3ecb0b8_340.jpg",
		description: "blah blah blah, balh blah blah",

	},
	{
		name: "Desert Mesa", 
		image: "https://farm4.staticflickr.com/3248/2794463440_a2fbc0b5de.jpg",
		description: "whatever, whateverwahter, whatever, wahtever"
	},
	{
		name: "Indian Creek",
		image: "https://farm5.staticflickr.com/4056/4697349460_a9da6ef6a7.jpg",
		description: "yep, yep yep, yep, yep, yep"
	}
];

function seedDB() {
	Campground.remove({}, function(err){
		if(err){
			console.log(err);
		} 
			console.log("remove campgrounds");
		data.forEach(function(seed){
			Campground.create(seed, function(err, campground){
				if(err){
					console.log(err);
				} else {
					console.log("added campground");
					Comment.create(
						{
							text: "This place is amazing and we love it",
							author: "Jim Smith"
						}, function(err, comment){
							if(err) {
								console.log(err);
							} else {
								campground.comments.push(comment);
								campground.save();
								console.log("new comment created.");
							}
						}
					)
				}
			});
		})
	})
}

module.exports = seedDB;
