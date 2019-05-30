var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/cat_app', { useNewUrlParser: true });

//TELLS JS SIDE OF THINGS THAT YOU WANT TO BE ABLE TO ADD CATS TO DATABASE AND A CAT SHOULD BE DEFINED AS FOLLOWED
//DEFINING A PATTERN FOR DATA, doesn't mean you're forbidden from adding new stuff
var catSchema = new mongoose.Schema({
    name: String, 
    age: Number, 
    temperament: String
});;

//COMPILED catSchema INTO A MODEL, CAN NOW MAKE NEW CATS TO FIND/REMOVE/UPDATE
var Cat = mongoose.model("Cat", catSchema);

/*
//ADDING NEW CAT TO DB
 var george = new Cat({
    name: "Mrs. Norris",
    age: 7,
    temperament: "Evil"
})
    //ADDS TO DB    
    //ADDING CALLBACK B/C NOT GOOD IDEA TO BLINDLY SAVE TO DB
george.save(function(err, cat){
    if(err){
        console.log("SOMETHING HAS GONE WRONG");
    }else{
        console.log("CAT HAS BEEN SAVED");
        console.log(cat);
    }
});
*/

Cat.create({
    name: "Snow White",
    age: 15,
    temperament: "Bland"
}, function(err, cat){
    if(err){
        console.log(err);
    }else{
        console.log(cat);
    }
});

//RETRIEVE ALL CATS FROM DB AND CONSOLE.LOG EACH ONE
Cat.find({}, function(err, cats){
    if(err){
        console.log("ERROR");
        console.log(err);
    }else{
        console.log("ALL THE CATS....");
        console.log(cats);
    }
});