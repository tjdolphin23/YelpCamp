var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
    seedDB          = require("./seeds")
    

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();


//PASSPORT CONFIGURATION
app.use(require('express-session')({ 
    secret: 'duke is my dog', 
    resave: false, 
    saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//LANDING PAGE
app.get("/", function(req, res){
	res.render("landing");
});


app.get("/campgrounds", function(req,res){	
	//get all campgrounds from DB
	Campground.find({}, function(err, allCampground){
		if(err) {
			console.log(err);
		} else {
			res.render("campgrounds/index", {campgrounds: allCampground});
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


//NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res){
   res.render("campgrounds/new"); 
});

// SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground)
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});


//========================
// COMMENTS ROUTES
//========================
app.get("/campgrounds/:id/comments/new", function(req, res){
    // find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {campground: campground});
        }
    })
});

app.post("/campgrounds/:id/comments", function(req, res){
   //lookup campground using ID
   Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
               console.log(err);
           } else {
               campground.comments.push(comment);
               campground.save();
               res.redirect('/campgrounds/' + campground._id);
           }
        });
       }
   });
});



//========================
// AUTH ROUTES
//========================

//show register form
app.get("/register", function(req, res){
  res.render("register")
});

//HANDLE SIGN UP LOGIC
app.post("/register", function(req, res){
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
app.get("/login", function(req, res){
  res.send("login page");
});

// HANDLE LOGIN LOGIC
app.post("/login", passport.authenticate("local",
  {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
  }), function(req, res) {
});


//local port
var PORT = process.env.PORT || 8080;
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});






































