const User = require('../models/user');

const badReq = 400;
const notFound = 404;
const defaultError = 500;

module.exports.getUser = (req, res) => {
  User.find({})
    .then((user) => res.send(user))
    .catch((err) => res.status(defaultError).send({ message: `Произошла ошибка на сервере. Текст ошибки: ${err}` }));
};

module.exports.getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => res.send(user))
    .catch((err) => res.status(notFound).send({ message: `Запрашиваемый пользователь не найден. Текст ошибки: ${err}` }));
};

module.exports.addUser = (req, res) => {
  User.create(req.body)
    .then((user) => res.send(user))
    .catch((err) => res.status(badReq).send({ message: `Переданы некорректные данные. Текст ошибки: ${err}` }));
};

module.exports.editProfile = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true })
    .then((user) => res.send(user))
    .catch((err) => res.status(badReq).send({ message: `Переданы некорректные данные. Текст ошибки: ${err}` }));
};

module.exports.editAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true })
    .then((user) => res.send(user))
    .catch((err) => res.status(badReq).send({ message: `Переданы некорректные данные. Текст ошибки: ${err}` }));
};
