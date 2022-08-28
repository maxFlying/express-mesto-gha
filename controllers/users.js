const User = require('../models/user');

const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

module.exports.getUser = (req, res) => {
  User.find({})
    .then((user) => res.send(user))
    .catch((err) => res.status(INTERNAL_SERVER_ERROR).send({ message: `Произошла ошибка на сервере. Текст ошибки: ${err.message}` }));
};

module.exports.getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND).send({ message: 'Пользователь по указанному _id не найден' });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST).send({ message: `Некорректный _id: ${err.message}` });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: `Произошла ошибка на сервере. Текст ошибки: ${err.message}` });
    });
};

module.exports.addUser = (req, res) => {
  User.create(req.body)
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).send({ message: `Переданы некорректные данные при создании пользователя. Текст ошибки: ${err.message}` });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: `Произошла ошибка на сервере. Текст ошибки: ${err.message}` });
    });
};

module.exports.editProfile = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND).send({ message: 'Пользователь с указанным _id не найден' });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).send({ message: `Переданы некорректные данные при обновлении профиля. Текст ошибки: ${err.message}` });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: `Произошла ошибка на сервере. Текст ошибки: ${err.message}` });
    });
};

module.exports.editAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND).send({ message: 'Пользователь с указанным _id не найден' });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).send({ message: `Переданы некорректные данные при обновлении аватара. Текст ошибки: ${err.message}` });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: `Произошла ошибка на сервере. Текст ошибки: ${err.message}` });
    });
};
