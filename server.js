const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const path = require('path');

// require the routes folder
const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')

const app = express();

// body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())


// DB config
// by appending the mongoURI at the end, 
// you can automatically add the object in the file
const db = require('./config/keys').mongoURI


// connect to mongo DB
mongoose
  .connect(db, {useNewUrlParser: true})
    .then(()=> console.log('MongoDB Connected'))
      .catch(err => console.log(err))


// passport middleware
// here we will initialize the passport to
app.use(passport.initialize())
// Passport Configuration (from a local folder)
// we can require it explicitly
require('./config/passport')(passport);

app.get('/', (req, res) => {
  res.send('Hello World')
})





app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts)


// server static assets if in prduction
if(process.env.NODE_ENV === 'production'){
  // set static folder
  app.use(express.static('client/build'))

  // create route
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}




const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})


