require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const { PORT = 3000 } = process.env;
const NOT_FOUND = 404;
const app = express();
const { celebrate, Joi } = require('celebrate');
const { addUser, login } = require('./controllers/users');
const { auth } = require('./middlewares/auth');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: false,
});

app.use(express.json());
app.use(cookieParser());

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    // eslint-disable-next-line no-useless-escape
    avatar: Joi.string().pattern(/(http|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), addUser);

app.use(auth);

app.use('/', require('./routes/users'));

app.use('/', require('./routes/cards'));

app.use('*', (req, res) => {
  res.status(NOT_FOUND).send({ message: 'Запрашиваемый путь не существует' });
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'Произошла ошибка на сервере' : `Ошибка: ${message} Код ошибки: ${err.statusCode}` });
  next();
});

app.listen(PORT);
