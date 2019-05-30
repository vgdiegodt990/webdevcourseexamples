var express = require("express");
var app = express();

// CREATING ROUTES

// "/" => "Hi there!"  / IS THE ROOT PATH
    //call back function with an argument, argument is seen as an object
app.get("/", function(req, res){
    res.send("Hi there!");
});

// "/bye" => "Goodbye!"
app.get("/bye", function(req, res){
    res.send("Bye!"); 
});

// "/dog" => "MEOW!"
app.get("/dog", function(req, res){
    console.log("SOMEBODY MADE A REQUEST TO /DOG");
    res.send("Meow"); 
});

//subreddit 
app.get("/r/:subredditName", function(req, res){
    var subreddit = req.params.subredditName;
    res.send("WELCOME TO THE " + subreddit.toUpperCase() + " SUBREDDIT!");
})
app.get("/r/:subredditName/comments/:id/:title/", function(req, res){
    console.log(req.params);
    res.send("WELCOME TO THE COMMENTS!");
})

//star route
app.get("*", function(req,res){
   res.send("YOU ARE A STAR!");
});

// Tell Express to listen for requests (start server) VERY IMPORTANT
    //NOTE: you do not have to do process.env.PORT, that is only because this is running on Cloud9's servers
    //Tells express to listen on a particular port that Cloud9 wants and a particular IP that Cloud9 expects
//NOTE: ANY TIME YOU MAKE CHANGES YOU HAVE TO RESTART IN THE COMMANDLINE TO HAVE THE CHANGES BE SHOWN
//STARTS SERVER
app.listen(process.env.PORT || 3000 , process.env.IP, function(){
    console.log("Server has started."); 
});