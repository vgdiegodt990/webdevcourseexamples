var mongoose = require("mongoose");

//POST - title, content
var postSchema = new mongoose.Schema({
    title: String, 
    content: String
});

/*
var postModel = mongoose.model("Post", postSchema);
*/

//MAKING IT EXPORTABLE 
module.exports = mongoose.model("Post", postSchema);