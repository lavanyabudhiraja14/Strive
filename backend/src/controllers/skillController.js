const Skill = require("../models/skills");

const createSkill = async (
  req,
  res
) => {
  try {
    const skill =
      await Skill.create({
        ...req.body,
        userId: req.user.id,
      });

    res.status(201).json(skill);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getSkills = async (
  req,
  res
) => {
  try {
    const skills =
      await Skill.find({
        userId: req.user.id,
      });

    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createSkill,
  getSkills,
};