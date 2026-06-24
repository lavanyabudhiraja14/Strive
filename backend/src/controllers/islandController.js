const Island = require("../models/island");

const completeDay = async (req, res) => {
  try {

    const island = await Island.findOne({
      userId: req.user.id,
    });

    if (!island) {
      return res.status(404).json({
        message: "Island not found",
      });
    }

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

    island.houses =
    island.currentStreak >= 50
      ? 1
      : 0;
    

    island.lastCompletedDate =
      new Date().toISOString();

    await island.save();

    res.json(island);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  completeDay,
};