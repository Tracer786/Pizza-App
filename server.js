//here the version of the connect-mongo is 4 but we need to use the 3 one
//to install the previous version just write the command
//yarn add connect-mongo@3

require('dotenv').config()
// firstly we will create the express server
// for that we will first have to import the express module
//1.
const express = require("express");
const app = express();
//4.
//Configuring the template engine
const ejs = require("ejs");
const path = require("path");
const expressLayout = require("express-ejs-layouts");
const PORT = process.env.PORT || 3000;
//here app and express are random variables
// app is variable
// express is the function used
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("express-flash");
// const MongoDbStore = require("connect-mongo")
const MongoDbStore = require("connect-mongo")(session)

// app.use(session({ secret: 'somevalue' }))
//above line is used to resolve the error on the web page
//"ERROR: secret option required for sessions"

//Database Connection

//snippet for connection to MongoDB that we use every time

// const url = "mongodb://localhost/pizza";
const url = "mongodb://0.0.0.0:27017/pizza";
mongoose.connect(url).then(() => console.log("Connected!"));
// mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: true });
const connection = mongoose.connection;
// connection.once('open', () => {
//   console.log('Database connected...');
// }).catch(err => {
//   console.log('Connection failed...')
// });


//session store
let mongoStore = new MongoDbStore({
  // mongoUrl: url,
  mongooseConnection: connection,
  collection: 'sessions',
  //this will create the sessions collection in our database
});



//will use flash as a middleware
app.use(flash());

//session config
//session library works as a middleware
app.use(session({
  secret: 'abc'||process.env.COOKIE_SECRET, 
  //we generally store the encrypted code outside our main code
  // for this we require the package dotenv
  //to access the .env we have to import the module
  //secret is used to encrypt the session
  //sessions does not work without cookies
  resave: false,
  saveUninitialized: false,
  store: mongoStore,
  cookie: { maxAge: 1000 * 60 * 60 * 24 }
  // cookie: { maxAge: 1000 *15 }
  // cookie age in ms
}))


//how do the sessions work?
//user sends the https request to server
//server issues the session id
//session id is unique for each client
//or we can also store using the files
//another option is the database
//for this project also we are storing our session inside the database
//we require the package express flash



//Assets
app.use(express.static("public"));
//this will set the public folder as a whole for the designing purpose

app.use(express.json())

//set template engine
app.use(expressLayout);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");

//routes should always be after the expressLayout setting

//3.
//the route of the / is inside the web.js

require("./routes/web")(app);

//2.
app.listen(PORT, () => {
  // it will always print the same line
  //to hardcore it we can use

  console.log(`listening on port ${PORT}`);
});

// to run the above file run the command "node server.js"
// but the problem here is that everytime we change the content of the file we have to run the command 'node server.js' again and again

// now to run the server we just need to give the command as 'yarn serve' which is defined in package.json

//also we have to restart the server evertime
// to handle the issue we have added the scripts menu in the package.json file
// for development we will use the "dev" script
// for deploying on live server we will use the "serve" script

//now to run this scripts present in the package.json file we simply need to type "npm run dev" or "yarn dev"

//now whenever we make any changes the server will restart automatically
