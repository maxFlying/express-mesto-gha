const router = require('express').Router();
const {
  getCard,
  addCard,
  deleteCard,
  likeCard,
  dilikeCard,
} = require('../controllers/cards');

router.get('/cards', getCard);
router.post('/cards', addCard);
router.delete('/cards/:cardId', deleteCard);
router.put('/cards/:cardId/likes', likeCard);
router.delete('/cards/:cardId/likes', dilikeCard);

module.exports = router;
