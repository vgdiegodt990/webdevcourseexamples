var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/blog_demo_2', { useNewUrlParser: true });
//module exports 
    //NEVER FORGET THE ./
var Post = require("./models/post");
var User = require("./models/user");

//ids are made for all the posts
/*
User.create({
    email: "aaa@gmail.com",
    name: "AaaMaN"
});
*/
/*
postModel.create({
    title: "HoasdfvdzasxvfsaFs 2",
    content: "asdgasdfgasdfgbsdfh"
}, function(err, post){
    if(err) {
        console.log(err);
    } else {
    User.findOne({email: "aaa@gmail.com"}, function(err, foundUser){
    if(err){
        console.log(err);
    } else {
         foundUser.posts.push(post._id);
        foundUser.save(function(err, data){
    if(err){
                    console.log(err);
                } else {
                    console.log(data);
                 }
                });
            }
        });
    }
});
*/
/*
//FIND USER
    //populating the posts array and then executing it 
User.findOne({email: "aaa@gmail.com"}).populate("posts").exec(function(err, user){
    if(err){
        console.log(err);
    }else{
        console.log(user);
    }
});
*/

//FIND ALL POSTS FOR THAT USER
