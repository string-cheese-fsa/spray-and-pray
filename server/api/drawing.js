const router = require("express").Router();
const { Drawing } = require("../db/models");
const Sequelize = require("sequelize");

router.get("/", async (req, res, next) => {
  try {
    const allDrawings = await Drawing.findAll();
    res.send(allDrawings);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const drawing = await Drawing.findOne({ where: { id: req.params.id } });
    res.send(drawing);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    // const lines = req.body
    const newDrawing = await Drawing.create({ lines: req.body });
    res.status(201).send(newDrawing);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
