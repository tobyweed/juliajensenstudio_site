var express = require("express"),
    router = express.Router({mergeParams: true}),
    passport = require("passport")
    
var User = require("../models/user"),
    Collection = require("../models/collection")

var middleware = require("../middleware")
    
//root route
router.get("/",function(req,res){
    Collection.find({}, function(err,paintings){
        if(err){
            console.log(err);
            res.render("error");
        } else {
            //Choose a random collection and send it to the landing page
            var num = 1000;
            while(!paintings[num] || !paintings[num].paintings[0]) {
                num = Math.floor(Math.random() * 3);
            }
            res.render("landing",{paintings:paintings[num].paintings});
        }
    })
});

//Instagram route
router.get("/instagram",function(req,res){
    res.render("instagram");
});

//===================================================================================================
//AUTH ROUTES
//===================================================================================================

//login routes
router.get("/login", function(req,res){
    res.render("login");
});

router.post("/login", passport.authenticate("local",{
    successRedirect: "/",
    failureRedirect: "/login"
}), function(req,res){ });

//logout route
router.get("/logout", function(req,res){
    req.logout();
    res.redirect("/paintings/oil");
});

//===================================================================================================
//MISC ROUTES
//===================================================================================================


//Export router
module.exports = router;


// New user registration in case you want to add a new user
// var newUser = new User({username: "juliajensen"});
// User.register(newUser, "1553", function(err,user){
//         if(err){
//         console.log(err);
//         }
// })