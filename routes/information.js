var express = require("express"),
    router = express.Router({mergeParams: true}),
    multer = require("multer"),
    cloudinary = require("cloudinary")
    
var Info = require("../models/infopage"),
    middleware = require("../middleware")

var storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './public/uploads/');
  },
  filename: function(req, file, cb){
    var filename = Date.now();
    switch (file.mimetype) {
      case 'image/png':
      filename = filename + ".png";
      break;
      case 'image/jpeg':
      filename = filename + ".jpeg";
      break;
      case 'image/jpg':
      filename = filename + ".jpg";
      break;
      default:
      break;
    }
    cb(null, filename);
  }
})

var upload = multer({ 
        storage: storage,
        limits: {fileSize: 1000000000, files:1},
    });
//===================================================================================================
//INFO ROUTES
//===================================================================================================
//:page is the name of the page you want to load. Needs to be placed below all other routes, as it is essentially the catch-all route.
//show route
router.get("/:page",function(req,res){
    var page = req.params.page; //the type of page you want to see
    Info.findOne({ page: page }, function(err,info){ //finds the proper information object
        if(err){
            console.log(err);
            res.render("error");
        } else{
            res.render("information/"+page, {info: info});
        }
    });
});

//update text route
router.put("/text/:page", middleware.isLoggedIn, function(req,res){
    var page = req.params.page;
    //get data from form and set the values to match
    var text = req.body.info.text;
    Info.findOneAndUpdate({page: page}, {$set:{text: text}}, function(err,info){
        if(err){
            console.log(err);
            res.render("error");
        } else{
            res.redirect("/information/"+page);
        }
    });
});

//update desc route
router.put("/desc/:page", middleware.isLoggedIn, function(req,res){
    var page = req.params.page;
    //get data from form and set the values to match
    var desc = req.body.info.desc;
    Info.findOneAndUpdate({page: page}, {$set:{desc: desc}}, function(err,info){
        if(err){
            console.log(err);
            res.render("error");
        } else{
            res.redirect("/information/"+page);
        }
    });
});

//update image route
router.put("/img/:page", middleware.isLoggedIn, upload.single('image'), function(req,res){
    var page = req.params.page;
    cloudinary.uploader.upload("./public/uploads/"+req.file.filename, function(result) { 
        var img = result.url;
        console.log(img);
        Info.findOneAndUpdate({page: page}, {$set:{img: img,}}, function(err,info){
            if(err){
                console.log(err);
                res.render("error");
            } else{
                res.redirect("/information/"+page);
            }
        });
    });
});

//Export router
module.exports = router;
