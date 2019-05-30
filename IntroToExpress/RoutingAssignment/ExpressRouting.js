var express = require("express");
var app = express();

//CREATING ROUTES

//FRONT 
app.get("/", function(req, res){
    res.send("Hi there, welcome to my assignment!");
});

//ANIMALS 
app.get("/speak/:animal", function(req, res){
    //.toLowerCase will make the page shown even if the user doesn't explicitly put "pig"
    var animalName = req.params.animal.toLowerCase();
    //COULD USE .PUSH TO CREATE MORE IF IT IS NEEDED
    var sounds = {
        pig: "Oink",
        cow: "Moo",
        dog: "Woof Woof!",
        cat: "Damn you to hell.",
        goldfish: "................"
    }
    var sound = sounds[animalName];
    res.send("The " + animalName + " says '" + sound + "'");
})

app.get("/repeat/:message/:times", function(req, res){
    var message = req.params.message;
    var times = Number(req.params.times);
    var result = "";
    for(var i = 0; i < times; i++){
        //space at the end prevents the words from being close together
        result += message + " ";
    }
    res.send(result);
});

//STAR 
app.get("*", function(req, res){
    res.send("Get a life.");
});

//STARTS SERVER
app.listen(process.env.PORT || 3000 , process.env.IP, function(){
    console.log("Server has started."); 
});

//NOTE: RES.SEND CAN ONLY BE SENT ONCE PER ROUTE