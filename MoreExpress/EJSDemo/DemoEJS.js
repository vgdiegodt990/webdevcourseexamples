var express = require("express");
var app = express();

//TELLS EXPRESS TO USE "Public" DIRECTORY FOR CONTENT
app.use(express.static("Public"));
//MAKES IT SO YOU DO NOT HAVE TO ADD ".ejs" TO THE END OF FILES
    //kinda minor but cool and efficient 
app.set("view engine", "ejs");

//EJS stands for Embedded JavaScript
app.get("/", function(req, res){
    res.render("home")
})

//RUSTY
app.get("/fallinlovewith/:thing", function(req, res){
    var thing = req.params.thing;
    //second part says that "thingVar" in the EJS file is equivalent to "thing" in the backend
    res.render("love", {thingVar: thing});
});

//POSTS
    //for practicing loops in EJS
app.get("/posts", function(req, res){
    var posts = [
        {title: "Post 1", author: "Susy"},
        {title: "Pet Bunny", author: "John"},
        {title: "nice.", author: "PP"}
    ]
    //COMMON TO NAME IT THE SAME THING
    res.render("posts", {posts: posts});
});

//STAR
app.get("*", function(req, res){
    res.send("Please go away.");
});


//STARTS SERVER
app.listen(process.env.PORT || 3000 , process.env.IP, function(){
    console.log("Server has started."); 
});

//NOTES: INSTALL npm ejs --save
//EJS LETS YOU EMBED JS IN HTML
//EJS MAKES HTML AND EVERYTHHING DYNAMIC