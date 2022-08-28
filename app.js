const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: false,
});

app.listen(PORT);

app.use((req, res, next) => {
  req.user = {
    _id: '630b56d6bddd897cd84d4847',
  };

  next();
});

app.use(express.json());

app.use('/', require('./routes/users'));

app.use('/', require('./routes/cards'));