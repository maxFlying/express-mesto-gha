const router = require('express').Router();
const {
  getUser,
  getUserById,
  editProfile,
  editAvatar,
  getMyInfo,
} = require('../controllers/users');

router.get('/users', getUser);
router.get('/users/me', getMyInfo);
router.get('/users/:userId', getUserById);
router.patch('/users/me', editProfile);
router.patch('/users/me/avatar', editAvatar);

module.exports = router;
