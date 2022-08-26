const Card = require('../models/card');

const badReq = 400;
const defaultError = 500;

module.exports.getCard = (req, res) => {
  Card.find({})
    .then((card) => res.send(card))
    .catch((err) => res.status(defaultError).send({ message: `Произошла ошибка на сервере. Текст ошибки: ${err}` }));
};

module.exports.addCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => res.status(badReq).send({ message: `Переданы некорректные данные. Текст ошибки: ${err}` }));
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .then((card) => res.send(card))
    .catch((err) => res.status(badReq).send({ message: `Переданы некорректные данные. Текст ошибки: ${err}` }));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send(card))
    .catch((err) => res.status(defaultError).send({ message: `Произошла ошибка на сервере. Текст ошибки: ${err}` }));
};

module.exports.dilikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send(card))
    .catch((err) => res.status(defaultError).send({ message: `Произошла ошибка на сервере. Текст ошибки: ${err}` }));
};
