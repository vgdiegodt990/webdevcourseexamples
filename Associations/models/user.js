var mongoose = require("mongoose");

//USER - email, name
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    //RELATIONSHIP/ASSOCIATION 
        //tells mongoose you want a list, an array of posts and you have to write postSchema, the name of the Schema
        //POSTSCHEMA MUST COME FIRST IN ORDER FOR THE RELATIONSHIP TO WORK
    //NEW WAY OF HAVING RELATIONSHIP
        //array of object IDs
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ]
});

/*
var User = mongoose.model("User", userSchema);
*/

//MAKING IT EXPORTABLE 
module.exports = mongoose.model("User", userSchema);