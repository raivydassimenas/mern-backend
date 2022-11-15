const express = require('express');
const { getGoals, postGoal, putGoal, deleteGoal } = require('../controllers/goalController');
const router = express.Router();

router.route('/').get(getGoals).post(postGoal);
router.route('/:id').put(putGoal).delete(deleteGoal);

module.exports = router;
