var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/cat_app', { useNewUrlParser: true });

//POST - title, content
var postSchema = new mongoose.Schema({
    title: String, 
    content: String
});
var postModel = mongoose.model("Post", postSchema);

//USER - email, name
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    //RELATIONSHIP/ASSOCIATION 
        //tells mongoose you want a list, an array of posts and you have to write postSchema, the name of the Schema
        //POSTSCHEMA MUST COME FIRST IN ORDER FOR THE RELATIONSHIP TO WORK
    posts: [postSchema]
});
var User = mongoose.model("User", userSchema);

/*
//USER
var newUser = new User({
    email: "frog@gmail.com",
    name: "Frogger"
})
    //MAKES IT SO POSTS IS SAVED TO USER
newUser.posts.push({
    title: "I got too many frogs, man",
    content: "Yo who wants some I got at least several boxes full of them"
});
newUser.save(function(err, user){
    if(err){
        console.log(err);
    }else{
        console.log(user);
    }
});
*/

/*
var newPost = new postModel({
   title: "Reflections on Apples",
   content: "They're delicious"
});

newPost.save(function(err, post){
    if(err){
        console.log(err);
    }else{
        console.log(post);
    }
});
*/

//RETRIEVING USER DATA
    //ONE TO MANY ASSOCIATE 
User.findOne({name: "Frogger"}, function(err, user){
    if(err){
        //console.log(err);
    }else{
        //PUSHING ANOTHER POST
        user.posts.push({
            title: "Hyper",
            content: "BRUH"
        });
        user.save(function(err, user){
            if(err){
                console.log(err);
            }else{
                console.log(user);
            }
        });
    }
});