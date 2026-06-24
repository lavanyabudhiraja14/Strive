const Goal = require("../models/goal");

const createGoal = async (req, res) => {
  try {
    const goal = await Goal.create({
      ...req.body,
      userId: req.user.id,
    });

    res.status(201).json(goal);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({
      userId: req.user.id,
    });

    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const updateGoal = async (req, res) => {
    try {
      const goal = await Goal.findById(req.params.id);
  
      if (!goal) {
        return res.status(404).json({
          message: "Goal not found",
        });
      }
  
      goal.current = req.body.current;
  
      if (goal.current >= goal.target) {
        goal.completed = true;
      }
  
      await goal.save();
  
      res.status(200).json(goal);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
  
  const deleteGoal = async (req, res) => {
    try {
      await Goal.findByIdAndDelete(
        req.params.id
      );
  
      res.status(200).json({
        message: "Goal deleted",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

  module.exports = {
    createGoal,
    getGoals,
    updateGoal,
    deleteGoal,
  };