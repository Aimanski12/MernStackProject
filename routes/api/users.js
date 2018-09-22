const express = require('express');
const router = express.Router();

// local gravatar
const gravatar = require('gravatar')

// load bcryptJS (make sure it is BCRYPT  JS)
const bcrypt = require('bcryptjs')

// Load User model
const User = require('../../models/Users')

// load jwt module
const jwt = require('jsonwebtoken')

// load the secretkey
const secret = require('../../config/keys')

// load passport module
const passport = require('passport')

// load input form validation for the registration
const validateRegisterInput = require('../../validation/register')

// load input form validation for the login
const validateLoginInput = require('../../validation/login')


// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/', (req, res, next) => {
  res.json({'msg': 'Users was working'})
})

// @route   GET api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res, next) => {

  // load the validation
  const { errors, isValid } = validateRegisterInput(req.body)
  
  console.log('isvalid: ', isValid)
  if(!isValid) {
    return res.status(400).json(errors)
  }


  User.findOne({ email: req.body.email })
  .then(user => {
    if(user){
       errors.email = 'Email already exists';
      return res.status(400).json({errors});
    } else {
      
      // use gravatar to grab the image
      const avatar = gravatar.url(req.body.email, {
        s: '200',  // size of the email
        r: 'pg',   // rating
        d: 'mm'    // default 
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });
      
      bcrypt.genSalt(10, (err, salt) => {
        // salt is the returned value
          // console.log(`this is the salt: ${salt}`)
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          // hash is the new hashedPassword
            // console.log(`this is the hashed password: ${hash}`)
          if(err) throw err;
          newUser.password = hash;
          newUser
            .save()
              .then(user => { 
                res.json(user)
              })
                .catch(err => console.log(err))
        })
      })
    }
  })
})



// @route   GET api/users/login
// @desc    Login User to return the JWT Token
// @access  Public
router.post('/login', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;


   const {errors, isValid} = validateLoginInput(req.body)
   console.log('isvalid: ', isValid)
   
   if (!isValid) {  return res.status(400).json(errors)  }



  // Find user by email
  User.findOne({email})
    .then(user => {
      // Check for user
      if(!user) {
        errors.email = 'User not found'
        return res.status(404).json({errors})
      } 

      // Check the password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if(isMatch) {
          // return res.status(200).json({success: 'We have logged in.'})

          // create jwt payload
            const payload  = { id: user.id, name: user.name, avatar: user.avatar}

          // Signed Token
            jwt.sign(
              payload, 
              secret.secretOrKey, 
              { expiresIn: 3600 }, 
                (err, token) => {
                  res.json({
                    success: true,
                    token: `Bearer ${token}`

                  })
            });
          } else {
            errors.password = 'Passowrd is invalid'
            return res.status(400).json(errors)
          }
        })

    })
})



// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get('/current', passport.authenticate('jwt', { session: false }), 
  (req, res, next) => {
    res.json({sucess: 'we are in the current route', user: req.user})
})

module.exports = router;





































