const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');


const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://The_plug_v2:The_plug_v2@cluster0.o9pdzjz.mongodb.net/the_plug_v2';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/termsandconditions', (req, res) => res.render('termsandconditions'));
app.get('/reviews', requireAuth, (req, res) => res.render('reviewspage'));
app.get('/businessreviews', (req, res) => res.render('businessreviews'));
app.get('/toppicks', (req, res) => res.render('toppicks'));
app.use(authRoutes);