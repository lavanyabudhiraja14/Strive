const Task = require("../models/task");
const Island = require("../models/island");
const Goal = require("../models/goal");
// Create Task

const createTask = async (req, res) => {
try {
const task = await Task.create({
...req.body,
userId: req.user.id,
});


res.status(201).json(task);


} catch (error) {
res.status(500).json({
message: error.message,
});
}
};

// Get All Tasks

const getTasks = async (req, res) => {
try {
const tasks = await Task.find({
userId: req.user.id,
});


res.status(200).json(tasks);


} catch (error) {
res.status(500).json({
message: error.message,
});
}
};

// Update Task

const updateTask = async (req, res) => {
try {

    const oldTask =
  await Task.findById(
    req.params.id
  );

const task = await Task.findByIdAndUpdate(
  req.params.id,
  req.body,
  { new: true }
);

if (!task) {
  return res.status(404).json({
    message: "Task not found",
  });
}

if ( !oldTask.completed &&
    task.completed) {
      
            task.completedAt = new Date();
            await task.save();
          
         

    if (task.goalId) {

        const goal = await Goal.findById(
          task.goalId
        );
      
        if (goal && !goal.completed) {
      
          goal.current += 1;
      
          if (
            goal.current >= goal.target
          ) {
            goal.completed = true;
          }
      
          await goal.save();
        }
      }

  const island = await Island.findOne({
    userId: req.user.id,
  }).populate("goalId");

  if (!island) {
    return res.status(404).json({
      message: "Island not found",
    });
  }

  const today = new Date()
    .toISOString()
    .split("T")[0];

  if (
    island.lastCompletedDate !== today
  ) {

    island.currentStreak += 1;

    if (
      island.currentStreak >
      island.longestStreak
    ) {
      island.longestStreak =
        island.currentStreak;
    }

    island.totalCompletedDays += 1;

    island.trees = Math.floor(
      island.totalCompletedDays / 2
    );

    island.flowers = Math.floor(
      island.totalCompletedDays / 7
    );

    island.stones = Math.floor(
      island.totalCompletedDays / 5
    );

    island.houses = Math.floor(
      island.totalCompletedDays / 30
    );

    island.ponds = Math.floor(
      island.totalCompletedDays / 100
    );

    island.lastCompletedDate =
      today;

    await island.save();
  }
}

res.status(200).json(task);


} catch (error) {
res.status(500).json({
message: error.message,
});
}
};

// Delete Task

const deleteTask = async (req, res) => {
try {


await Task.findByIdAndDelete(
  req.params.id
);

res.status(200).json({
  message: "Task deleted",
});


} catch (error) {
res.status(500).json({
message: error.message,
});
}
};

module.exports = {
createTask,
getTasks,
updateTask,
deleteTask,
};
