//EXPRESS
var express = require("express");
var app = express();
    //body-parser
var bodyParser = require("body-parser");

//NEED TO TELL EXPRESS TO USE BODY-PARSER  
    //need to check docs in order to find what urlencoded is, but it's going to be in every project
app.use(bodyParser.urlencoded({extended: true}));

//ARRAY FOR FRIENDS
var friends = ["Tony", "Miranda", "Justin", "Pierre", "Linda"];

//NO MORE .ejs 
app.set("view engine", "ejs");

//DIRECTORY
app.get("/", function(req, res){
    res.render("home"); 
});

//FRIENDS
app.get("/friends", function(req, res){
    //PASSING IN THE DATA
    res.render("friends", {friends: friends}); 
});

app.post("/addfriend", function(req, res){
    //req.body contains all the data from the request
        //express, out of the box, doesn't create the request body 
            //need to explicity tell it to take the request body and turn it into a JS object
            //install body-parser to see it
    //whatever you put in the name form needs to be in the req.body
    var newFriend = req.body.newfriend;
    //ADDS NEW PERSON IN THE FRIEND LIST
    friends.push(newFriend);
    //TAKES THE NAME OF THE ROUTE, NO MORE GOING TO ANOTHER PAGE AND DOES IT INSTANT
    res.redirect("/friends");
});

//STAR
app.get("*", function(req, res){
    res.render("You are lost."); 
});


//APP.LISTEN
app.listen(process.env.PORT || 3000 , process.env.IP, function(){
    console.log("Server has started."); 
});