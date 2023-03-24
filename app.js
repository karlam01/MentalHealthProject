//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

// Set up connection to the database


const homeStartingContent = "Maynooth University Mental Health Services Provided.";
const serviceContent = "These are the services we have available at maynooth university";


const app = express(process.env.API_KEY);

console.log

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://karlamihut:karlamihut@cluster0.ddijlh0.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser: true});


const userSchema = new mongoose.Schema ({
  email: String,
  password: String
});

userSchema.plugin(passportLocalMongoose);
//userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());

passport.deserializeUser(User.deserializeUser());


app.get("/login", function(req, res){
  res.render("login");
});

app.get("/register", function(req, res){
  res.render("register");
});

app.get("/compose", function(req, res){
  if (req.isAuthenticated()){
    res.render("compose");
  } else {
    res.redirect("/login");
  }
});

app.get("/logout", function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

app.post("/register", function(req, res){
  User.register({username: req.body.username}, req.body.password, function(err, user){
  if (err) {
    console.log(err);
    res.redirect("/register");
  } else {
    passport.authenticate("local")(req, res, function(){
      res.redirect("/login");
    });
  }
});


});

app.post("/login", function(req, res){
  const user = new User({
  username: req.body.username,
  password: req.body.password
});

req.login(user, function(err){
  if (err) {
    console.log(err);
  } else {
    passport.authenticate("local")(req, res, function(){
      res.redirect("/compose");
    });
  }
});

});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});


app.get("/compose", function(req, res){
  res.render("compose");
})

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

const resourceSchema = {
  name: String,
  info: String,
  person: String,
  descriptor: String
};

const Resource = mongoose.model("Resource", resourceSchema);

app.get("/service", function(req, res){

  Resource.find({}, function(err, resources){
    res.render("service", {
      serviceContent: serviceContent,
      resources: resources
      });
  });
});

//app.get("/serviceInsert", function(req, res){
//  res.render("serviceInsert");
//});
app.get("/serviceInsert", function(req, res){
  if (req.isAuthenticated()){
    res.render("serviceInsert");
  } else {
    res.redirect("/login");
  }
});

app.post("/serviceInsert", function(req, res){
  const resource = new Resource({
    name: req.body.serviceName,
    info: req.body.serviceInfo,
    person: req.body.contactPerson,
    descriptor: req.body.serviceDescriptor
  });


  resource.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

app.post("/login", function(req, res){
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({email: username}, function(err, foundUser){
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        if (foundUser.password === password) {
          res.redirect("/");
        }
      }
    }
  });
});

app.get("/resources/:resourceId", function(req, res){

const requestedResourceId = req.params.resourceId;

  Resource.findOne({_id: requestedResourceId}, function(err, resource){
    res.render("resource", {
      name: resource.name,
      info: resource.info,
      person: resource.person,
      descriptor: resource.descriptor
    });
  });

});




app.listen(3000, function() {
  console.log("Server started on port 3000");
});
