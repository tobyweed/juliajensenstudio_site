var express = require("express"),
    router = express.Router({mergeParams: true}),
    multer = require("multer"),
    fs = require("fs"),
    cloudinary = require('cloudinary')
    
var Collection = require("../models/collection")
    
var middleware = require("../middleware")

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
//PAINTINGS ROUTES
//===================================================================================================

//INDEX
router.get("/",function(req,res){
    Collection.findOne({name: req.params.type}, function(err, collection){
       if(err){
           console.log(err);
           return res.render("error");
       } else {
          var paintingsRev = invertArray(collection.paintings);
          res.render("paintings/index",{paintings:paintingsRev, parent:req.params.type});
       }
    });
});

//NEW
router.get("/new", middleware.isLoggedIn, function(req,res){
    Collection.findOne({name: req.params.type}, function(err, collection){
       if(err){
           console.log(err);
           return res.render("error")
       } else {
           res.render("paintings/new",{paintings:collection.paintings,parent:req.params.type});
       }
    });
});

//CREATE
router.put("/", middleware.isLoggedIn, upload.single('image'), function(req,res){
    var type = req.params.type;
    cloudinary.uploader.upload("./public/uploads/"+req.file.filename, function(result) { 
        var img = result.url;
        console.log(img);
        Collection.findOneAndUpdate( {name: type}, 
            { $push: {'paintings': {img: img,
                                 description: req.body.description,
                                 parent: type }}},
            function(err, paintings){
                if(err){
                    console.log(err);
                    return res.render("error")
                } else {
                    res.redirect("/paintings/"+type);
                }
        });
    });
});

//SHOW
router.get("/:index", function(req,res){
    var index = req.params.index;
    Collection.findOne({name: req.params.type}, function(err, collection){
       if(err){
           console.log(err);
           return res.render("error")
       } else {
          var paintingsRev = invertArray(collection.paintings);
          res.render("paintings/show", {painting: paintingsRev[index],paintings: paintingsRev});
       }
    });
});

// //EDIT
// router.get("/:index/edit", middleware.isLoggedIn, function(req,res){
//     var index = req.params.index;
//     Collection.findOne({name: req.params.type}, function(err,collection){
//         if(err){
//             console.log(err);
//             return res.render("error")
//         } else{
//             res.render("paintings/edit", {painting:collection.paintings[index], paintings:collection.paintings});
//         }
//     });
// });

//UPDATE
// router.put("/:index", middleware.isLoggedIn, upload.single('image'), function(req,res){
//     var type = req.params.type;
//     var index = req.params.index;
//     var painting = {
//         img: "/uploads/"+req.file.filename,
//         description: req.body.painting.description,
//         parent: type
//     }
//     var $set = { $set: {} };
//     $set.$set['paintings.' + index] = painting;
//     Collection.findOneAndUpdate( {name: type}, 
//         $set,
//         function(err, paintings){
//             if(err){
//                 console.log(err);
//                 return res.render("error")
//             } else {
//                 res.redirect("/paintings/"+type);
//             }
//     });
// });

//DESTROY
router.put("/:index/delete", middleware.isLoggedIn, function(req,res){
    var type = req.params.type;
    var index = req.params.index;
    Collection.findOne({name:type},function(err,collection){
        if(err){
            console.log(err);
            return res.render("error")
        } else{
            var paintingsRev = invertArray(collection.paintings);
            var idOfRemove = paintingsRev[index]._id;
            Collection.findOneAndUpdate({name:type},{$pull:{ paintings:{ _id: idOfRemove}}}, function(err,removedPainting){
                if(err){
                    console.log(err);
                    return res.render("error")
                } else{
                    res.redirect("/paintings/"+type);
                }
            })
        }
    })
});

function invertArray(array){
    var paintingsArray = array;
    var numPaints = paintingsArray.length;
    var paintingsRev = new Array(numPaints);
    for(var i = 0; i<numPaints; i++){
      paintingsRev[i] = paintingsArray[numPaints-1-i];
    }
    return paintingsRev;
}


//Export router
module.exports = router;