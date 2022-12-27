const User = require('../../models/user')
const bcrypt = require('bcrypt')
const passport = require('passport')
function authController()
{
    return {
        login(req, res) {
            res.render('auth/login')
        },
        postLogin(req, res, next) {
            passport.authenticate('local', (err, user, info) => {
                if (err) {
                    req.flash('error', info.message)
                    return next(err)
                }
                if (!user) {
                    req.flash('error', info.message)
                    return res.redirect('/login')
                }
                req.logIn(user, () => {
                    if (err) {
                        req.flash('error', info.message)
                        return next(err)
                    }
                    return res.redirect('/')
                })
            })(req, res, next)
        },
        register(req, res) {
            res.render('auth/register')
        },
        async postRegister(req, res) {
            const { name, email, password } = req.body;
            //Validate Request
            if (!name || !email || !password) {
                req.flash('error', 'All fields are required')
                req.flash('name', name)
                req.flash('email', email)
                //this is generally used when we do not fill any field in form
                //then while displaying the message 'all fields are required' the form will automatically clear all the fields
                //to prevent we also have to pass the filled fields along with the error message
                // also we need to use the value attribute in the file this.register.ejs
                return res.redirect('/register')
            }

            //check if email exists
            User.exists({ email: email }, (err, result) => {
                if (result) {
                    req.flash('error', 'Email already exists')
                    req.flash('name', name)
                    req.flash('email', email)
                    return res.redirect('/register')
                }
            })

            //hash password
            //for hashing a password we require the package bcrypt
            const hashedPassword = await bcrypt.hash(password, 10)

            //Create a user in the database
            const user = new User({
                // name: name,
                // email: email,
                //the above and the below line are one and the same thing
                name,
                email,
                password: hashedPassword
            })
            user.save().then((user) => {
                //redirect to the home page
                //directly login after registration success
                return res.redirect('/')
            }).catch(err => {
                req.flash('error', 'Something went wrong')
                return res.redirect('/register')
            })

            // console.log(req.body)
        },
        // logout(req, res) { 
        //     req.logout()
        //     return res.redirect('/login')
        //     // return res.redirect('/')
        // }
    
        logout(req, res, next) {
            req.logout(function(err) {
              if (err) { return next(err); }
              res.redirect('/login');
            });
          }
    }
}

module.exports = authController

//for login with facebook, google you can use the package named passport
//just search 'passport js' on the web to get the info about this package 