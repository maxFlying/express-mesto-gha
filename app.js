const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const NOT_FOUND = 404;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: false,
});

app.use((req, res, next) => {
  req.user = {
    _id: '630b56d6bddd897cd84d4847',
  };

  next();
});

app.use(express.json());

app.use('/', require('./routes/users'));

app.use('/', require('./routes/cards'));

app.use('*', (req, res) => {
  res.status(NOT_FOUND).send({ message: 'Запрашиваемый путь не существует' });
});

app.listen(PORT);
