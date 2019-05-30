var express               = require("express"),
    mongoose              = require("mongoose"),
    passport              = require("passport"), 
    bodyParser            = require("body-parser"),
    LocalStrategy         = require("passport-local"), 
    passportLocalMongoose = require("passport-local-mongoose"),
    User                  = require("./models/user");
    
mongoose.connect('mongodb://localhost:27017/cat_app', { useNewUrlParser: true });

var app = express();

app.use(require("express-session")({
    secret: "Rusty is the best and cutest dog in the world",
    resave: false, 
    saveUninitialized: false
}));

app.set("view engine", "ejs");
//setting passport up so that it will work in app
//creating new local strategy using the authenicate method
passport.use(new LocalStrategy(User.authenticate()));
app.use(passport.initialize());
app.use(passport.session());
    //can get data from form
app.use(bodyParser.urlencoded({extended:true}));

//responsible for reading the session, taking the data from the session that's coded and uncoding it and encoding and putting it back into session
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//==================
//    ROUTES 
//==================
app.get("/", function(req, res){
    res.render("home");
});

//isLoggedIn IS MIDDLEWARE TO CHECK IF USER IS LOGGED TO SHOW PAGEs
app.get("/secret", isLoggedIn, function(req, res){
    res.render("secret");
});

//AUTH ROUTES
    //Show sign up form
app.get("/register", function(req, res){
   res.render("register"); 
});
    //Handles user sign up
app.post("/register", function(req, res){
        //you do not save password to database
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('register');
        }
            //will log the user in and mark the session and store info, runs serialized user
        passport.authenticate("local")(req, res, function(){
           res.redirect("/secret");
        });
    });
});

//LOGIN ROUTES
app.get("/login", function(req, res){
   res.render("login"); 
});
//login logic
    //middleware, code that runs before final route callback
    //idea is that they sit between the beginning of your route and at the end 
        //this code written is checking if the creditals are accurate
app.post("/login", passport.authenticate("local", {
    //if it works you go to /secret
    successRedirect: "/secret",
    //if it fails you go to /login
    failureRedirect: "/login"
}) ,function(req, res){
});

//LOGGING OUT 
app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

//ISLOGGED, middleware
function isLoggedIn(req, res, next){
    //checking if user is signed in, session
    if(req.isAuthenticated()){
        //next refers to the callback function that is played NEXT after middlewear
        return next();
    }
    res.redirect("/login");
}

//STAR
app.get("*", function(req, res){
    res.send("Go away");    
});

//STARTS SERVER
app.listen(process.env.PORT || 3000 , process.env.IP, function(){
    console.log("Server has started."); 
});

//===========
//MIDDLEWARE LOGIC: 
//app.post("/login", middleware, callback)
//===========