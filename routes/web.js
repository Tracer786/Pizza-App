// here we will keep all the web related routes

const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customers/cartController')
const guest = require('../app/http/middlewares/guest')

// function initRoutes(app){
//     app.get('/', (req, res) => {
//         // res.send('Hello From Server')
//         res.render('home')
//         // res.render('Hello from server')
//         //we have set the path to render for the express in the app.set
//         //we can simply render the file in that location
//     })


function initRoutes(app) {
    app.get('/',homeController().index)

    app.get('/cart',cartController().index)
    //this will render the cart page
    
    //process.env is outside the app
    
    // it will firstly check the process.env
    // if it has the variable PORT it will run on that port
    // otherwise it will run on port 3000
    
    
    app.get('/login', guest,  authController().login)
    app.post('/login', authController().postLogin)
    
    app.get('/register', guest ,authController().register)
    app.post('/register',authController().postRegister)

    app.post('/logout',authController().logout)

    app.post('/update-cart',cartController().update)
    //updating the cart in the sessions using the app.js
}

//this exported module would be imported in the server.js
module.exports = initRoutes