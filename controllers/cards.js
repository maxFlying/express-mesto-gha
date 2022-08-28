const Card = require('../models/card');

const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

module.exports.getCard = (req, res) => {
  Card.find({})
    .then((card) => res.send(card))
    .catch((err) => res.status(INTERNAL_SERVER_ERROR).send({ message: `Произошла ошибка на сервере. Текст ошибки: ${err}` }));
};

module.exports.addCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).send({ message: `Переданы некорректные данные при создании карточки. Текст ошибки: ${err.message}` });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: `Произошла ошибка на сервере. Текст ошибки: ${err.message}` });
    });
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND).send({ message: 'Карточка с указанным _id не найдена.' });
      }
      return res.send(card);
    })
    .catch((err) => res.status(INTERNAL_SERVER_ERROR).send({ message: `Произошла ошибка на сервере. Текст ошибки: ${err}` }));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND).send({ message: 'Передан несуществующий _id карточки.' });
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST).send({ message: `Переданы некорректные данные для постановки лайка. Текст ошибки: ${err.message}` });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: `Произошла ошибка на сервере. Текст ошибки: ${err.message}` });
    });
};

module.exports.dilikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND).send({ message: 'Передан несуществующий _id карточки.' });
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST).send({ message: `Переданы некорректные данные для снятия лайка. Текст ошибки: ${err.message}` });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: `Произошла ошибка на сервере. Текст ошибки: ${err.message}` });
    });
};
