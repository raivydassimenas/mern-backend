const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/userController');
const { reqisterUser, loginUser, getMe } = require('../controllers/userController');

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/', getMe);

module.exports = router;