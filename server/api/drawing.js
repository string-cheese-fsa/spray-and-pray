const router = require('express').Router()
const { Drawing } = require('../db/models')
const Sequelize = require('sequelize')

router.get('/', async (req, res, next) => {
  try {
    const allDrawings = await Drawing.findAll()
    res.send(allDrawings)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const lines = req.body.lines
    const newDrawing = await Drawing.create({ lines })
    res.status(201).send(newDrawing)
  } catch (error) {
    next(error)
  }
})
