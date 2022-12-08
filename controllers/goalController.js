const asyncHandler = require('express-async-handler');
const Goal = require('../model/goalModel');
const User = require('../model/userModel');
const mongoose = require('mongoose');

// const getGoals = asyncHandler(async (req, res) => {
//     const goals = await Goal.find();
//     res.status(200).json(goals);
// });

const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user._id });

    res.status(200).json(goals);
});

const postGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error("There is no text field");
    }


    const goal = await Goal.create({
        user: req.body.userId,
        text: req.body.text
    });

    res.status(200).json(goal);
});

const putGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
        res.status(400);
        throw new Error("Goal not found");
    }

    const user = await User.findById(mongoose.Types.ObjectId(req.body.user));

    if (!user) {
        res.status(403);
        throw new Error('User not found');
    }

    if (goal.user.toString() !== user._id.toString()) {
        res.status(403);
        throw new Error('User not authorized');
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id,
        req.body, {new: true});
    
    res.status(200).json(updatedGoal);
});

const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
        res.status(400);
        throw new Error("Goal not found");
    }

    const user = await User.findById(mongoose.Types.ObjectId(req.body.user));

    if (!user) {
        res.status(403);
        throw new Error('User not found');
    }

    if (goal.user.toString() !== user._id.toString()) {
        res.status(403);
        throw new Error('User not authorized');
    }

    await goal.remove();
    res.status(200).json({ id: req.params.id });
});

module.exports = {
    getGoals,
    postGoal,
    putGoal,
    deleteGoal
};