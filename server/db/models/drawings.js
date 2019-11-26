const Sequelize = require('sequelize')
const db = require('../db')

const Drawing = db.define('drawing', {
  lines: {
    type: Sequelize.TEXT
  }
})

Drawing.beforeValidate(async (drawing, options) => {
  try {
    drawing.lines = drawing.lines.toString()
    await drawing.save()
  } catch (error) {
    console.error(error)
  }
})

module.exports = Drawing
