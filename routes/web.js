// here we will keep all the web related routes

const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customers/cartController')
const orderController = require('../app/http/controllers/customers/orderController')
const adminOrderController = require('../app/http/controllers/admin/orderController')
const statusController = require('../app/http/controllers/admin/statusController')


//Middlewares
const guest = require('../app/http/middlewares/guest')
const auth = require('../app/http/middlewares/auth')
const admin = require('../app/http/middlewares/admin')


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

    
    //Customer Routes
    app.post('/orders',auth, orderController().store)
    app.get('/customer/orders', auth, orderController().index)
    app.get('/customer/orders/:id', auth, orderController().show)
    
    //Admin Routes
    app.get('/admin/orders', admin, adminOrderController().index)
    //admin/order/status
    app.post('/admin/order/status', admin, statusController().update)

}

//this exported module would be imported in the server.js
module.exports = initRoutes