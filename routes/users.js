const router = require('express').Router();
const {
  getUser,
  getUserById,
  addUser,
  editProfile,
  editAvatar,
} = require('../controllers/users');

router.get('/users', getUser);
router.get('/users/:userId', getUserById);
router.post('/users', addUser);
router.patch('/users/me', editProfile);
router.patch('/users/me/avatar', editAvatar);

module.exports = router;
