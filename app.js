//Dependencies
var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    multer = require("multer"),
    mongoose = require("mongoose"),
    passport   = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    User = require("./models/user"),
    cloudinary = require('cloudinary')
    // seedDB = require("./seeds")

var paintingRoutes = require("./routes/paintings"),
    indexRoutes = require("./routes/index"),
    informationRoutes = require("./routes/information")
    
var middleware = require("./middleware")

//Setup
mongoose.connect("mongodb://"+ process.env.MONGO_USER + ":" + process.env.MONGO_PASSWORD + "@ds123976.mlab.com:23976/juliajensenstudio");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

//Passport configuration
app.use(require("express-session")({
    secret: "My special secret",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
});

//cloudinary config
cloudinary.config({ 
  cloud_name: process.env.CLOUD_USER, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_API_SECRET
});

app.use(indexRoutes);
app.use("/paintings/:type", paintingRoutes);
app.use("/information",informationRoutes);
app.get("*",function(req,res){
    res.render("empty");
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server is listening");
})