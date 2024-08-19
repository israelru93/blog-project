const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const expresSession= require('express-session')
const flash = require('connect-flash');


const newPostController = require("./Controller/newPost");
const homeController = require("./Controller/Home");
const storePostController = require("./Controller/storePOst");
const getPostController = require("./Controller/getPost");
const validateMiddleware = require("./Middleware/ValditionMIddler");
const newUserController = require("./Controller/newUser");
const storeUserControoler= require('./Controller/storeUser')
const loginController =require('./Controller/login') 
const loginUsercontroller= require('./Controller/loginUser')
const authMiddelewere =require ('./Middleware/authMiddlewere')
const redirectauthMiddlewere= require('./Middleware/redirectAuthMiddelewere')
const logoutControoler =require('./Controller/logout')
const app = express();
global.loggedIn=null;


app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use("/posts/store", validateMiddleware);




app.use(expresSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: false
    }
}));

app.use(flash());
app.set("view engine", "ejs");

mongoose
  .connect("mongodb://localhost/mydb")
  .then(() => console.log("DB UP!"))
  .catch((error) => console.error("Error connecting to DB:", error));

  app.use('*',(req,res,next)=>{
    loggedIn=req.session.userId;
    next()
   })

app.get("/", homeController);
app.get('/auth/logout',logoutControoler)
app.get("/auth/register",redirectauthMiddlewere, newUserController);
app.get('/auth/login',redirectauthMiddlewere, loginController)
app.get("/post/:id", getPostController);
app.get("/posts/new", authMiddelewere,newPostController);
app.post("/posts/store",authMiddelewere, storePostController);
app.post('/users/register',redirectauthMiddlewere,storeUserControoler)
app.post('/users/login',redirectauthMiddlewere,loginUsercontroller)
app.use((req,res)=> res.render('notfound'))

app.listen(3000, () => {
  console.log("Server is up on port 3000!");
});
