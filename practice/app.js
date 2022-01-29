const path = require('path');
const PORT = process.env.PORT || 3000;

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('61f427bf1f20d17abed8d4f4')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
  
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://jamiepeck:43v3rF%40mily@cluster0.vp6wz.mongodb.net/shop')
.then(result => {
  User.findOne().then(user => {
    if (!user) {
      const user = new User({
        name: 'Jay',
        email: 'test@test.com',
        cart: {
          items: []
        }
      });
      user.save();
    }
  });
  app.listen(PORT);
})
.catch(err => {
  console.log(err);
});