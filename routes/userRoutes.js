const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/userController');
const { reqisterUser, loginUser, getMe } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/', protect, getMe);

module.exports = router;