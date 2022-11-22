const express = require('express');
const { getGoals, postGoal, putGoal, deleteGoal } = require('../controllers/goalController');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getGoals).post(protect, postGoal);
router.route('/:id').put(protect, putGoal).delete(protect, deleteGoal);

module.exports = router;
