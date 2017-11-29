var mongoose = require("mongoose"),
    Collection = require("./models/collection"),
    Info = require("./models/infopage")
    
mongoose.connect("mongodb://localhost/juliajensen_website");

var data = [
    {
        name: "oil",
        paintings: [ 
            {
                img: "/uploads/2989.jpg",
                description: "Placeholder image. XXXX",
                parent: "oil"
            },
            {
                img: "/uploads/green_body.jpg",
                description: "kjadfnljsaldf",
                parent: "oil"
            },
            {
                img: "/uploads/2989.jpg",
                description: "Placeholder image. XXXX",
                parent: "oil"
            },
            {
                img: "/uploads/img_1.png",
                description: "kjadfnljsaldf",
                parent: "oil"
            },
            {
                img: "/uploads/img_1.png",
                description: "kjadfnljsaldf",
                parent: "oil"
            },
            {
                img: "/uploads/2989.jpg",
                description: "Placeholder image. XXXX",
                parent: "oil"
            },
            {
                img: "/uploads/storm_body.jpg",
                description: "kjadfnljsaldf",
                parent: "oil"
            },
            {
                img: "/uploads/2989.jpg",
                description: "Placeholder image. XXXX",
                parent: "oil"
            },
            {
                img: "/uploads/img_1.png",
                description: "kjadfnljsaldf",
                parent: "oil"
            },
            {
                img: "/uploads/2989.jpg",
                description: "Placeholder image. XXXX",
                parent: "oil"
            },
            {
                img: "/uploads/img_1.png",
                description: "kjadfnljsaldf",
                parent: "oil"
            },
            {
                img: "/uploads/2989.jpg",
                description: "Placeholder image. XXXX",
                parent: "oil"
            }
        ]
    },
    {
        name: "encaustic",
        paintings: [ 
            {
                img: "/uploads/img_1.png",
                description: "Placeholder image. XXXX",
                parent: "encaustic"
            },
            {
                img: "/uploads/img_2989.1.jpg",
                description: "dsafasdfas",
                parent: "encaustic"
            },
            {
                img: "/uploads/img_1.2.png",
                description: "Placeholder image. XXXX",
                parent: "encaustic"
            }
        ]
    },
    {
        name: "wax",
        paintings: [ 
            {
                img: "http://placehold.it/500x500",
                description: "Placeholder image. XXXX",
                parent: "wax"
            }
        ]
    },
]

var info = [
    {
        page: "workshops",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        img: "https://juliajensenstudio.files.wordpress.com/2015/11/img_2530.jpg?w=902&h=890",
        desc: "Image from XXXX, oil on canvas"
    }, 
    {
        page: "statement",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        img: "https://juliajensenstudio.files.wordpress.com/2015/11/img_2530.jpg?w=902&h=890",
        desc: "Image from XXXX, oil on canvas"
    }, 
    {
        page: "contact",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        img: "https://juliajensenstudio.files.wordpress.com/2015/11/img_2530.jpg?w=902&h=890",
        desc: "Image from XXXX, oil on canvas"
    }
]

function seedDB(){
    Collection.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("removed");
        }
     //add a few Collections
        data.forEach(function(seed){
            Collection.create(seed, function(err, collection){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a Collection");
                }
            });
        });
    });
        
    Info.remove({}, function(err){
        if(err){
            console.log(err);
        } else{
            //add the info for the info pages
            info.forEach(function(seed){
                Info.create(seed, function(err, collection){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added an infopage");
                    }
                });
            });
        }
    }); 
}

module.exports = seedDB();





// var oil = [
//         {
//             img: "http://placehold.it/500x500",
//             description: "Placeholder image. XXXX",
//             index: 0,
//             parent: "oil"
//         },
//         {
//             img: "http://placehold.it/500x500",
//             description: "Placeholder image. XXXX",
//             index: 1,
//             parent: "oil"
//         },
//         {
//             img: "http://placehold.it/500x500",
//             description: "Placeholder image. XXXX",
//             index: 2,
//             parent: "oil"
//         }
//     ];
    
// var encaustic = [
//         {
//             img: "http://placehold.it/500x500",
//             description: "Placeholder image. XXXX",
//             index: 0,
//             parent: "encaustic"
//         },
//         {
//             img: "http://placehold.it/500x500",
//             description: "Placeholder image. XXXX",
//             index: 1,
//             parent: "encaustic"
//         },
//         {
//             img: "http://placehold.it/500x500",
//             description: "Placeholder image. XXXX",
//             index: 2,
//             parent: "encaustic"
//         }
//     ];

// var wax = [
//         {
//             img: "http://placehold.it/500x500",
//             description: "Placeholder image. XXXX",
//             index: 0,
//             parent: "wax"
//         },
//         {
//             img: "http://placehold.it/500x500",
//             description: "Placeholder image. XXXX",
//             index: 1,
//             parent: "wax"
//         },
//         {
//             img: "http://placehold.it/500x500",
//             description: "Placeholder image. XXXX",
//             index: 2,
//             parent: "wax"
//         }
//     ];
    