//SETTING UP BASICS
var express      = require("express"),
app              = express(), 
bodyParser       = require("body-parser"),
mongoose         = require("mongoose"),
methodOverride   = require("method-override"),
expressSanitizer = require("express-sanitizer");

//APP CONFIG
mongoose.connect('mongodb://localhost:27017/restful_blog_app', { useNewUrlParser: true });
app.set("view engine", "ejs");
    //SERVES CUSTOM STYLE SHEET 
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
    //SANITIZER TO BE AFTER BODY-PARSER
app.use(expressSanitizer());
app.use(methodOverride("_method"));

//MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
        //could give this a default image incase none is shown 
            //image: {type: String, default: "placeholderimage.jpg"}
    image: String,
    body: String,
        //says that created should be a date and that there's a default value data as of the date created
            //"default" SHOULD ALWAYS BE LOWERCASE
    created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

//RESTFUL ROUTES
    //REDIRECTS TO /BLOGS
app.get("/", function(req, res){
    res.redirect("/blogs");
});

//INDEX ROUTE
    //RENDERING /BLOGS
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
        }else{
            //RENDERING W/ DATA
            res.render("index", {blogs: blogs});     
        }
    });
});

//NEW ROUTE
app.get("/blogs/new", function(req, res){
   res.render("new"); 
});

//CREATE ROUTE 
app.post("/blogs", function(req, res){
    //CREATE BLOG 
        //SANITIZING 
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("new");
        }else{
            //THEN, REDIRECT TO INDEX
            res.redirect("/blogs");
        }
    });
});

//SHOW ROUTE 
app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("show", {blog: foundBlog});
        }
    });
});

//EDIT ROUTE 
app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("edit", {blog: foundBlog});
        }
    });
});

//PUT ROUTE / UPDATE ROUTE
app.put("/blogs/:id", function(req, res){
        //SANITIZING 
    req.body.blog.body = req.sanitize(req.body.blog.body);
    // TAKES THREE ARGUMENTS: id, newData, and callback
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

//DELETE ROUTE 
app.delete("/blogs/:id", function(req, res){
    //DESTROY BLOG 
        //ONLY ERR B/C NO DATA IS GOING TO BE SENT BACK
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blogs");
        }else{
            //redirect somewhere
            res.redirect("/blogs");
        }
    });
});

//APP.LISTEN
app.listen(process.env.PORT || 3000 , process.env.IP, function(){
    console.log("Server has started."); 
});