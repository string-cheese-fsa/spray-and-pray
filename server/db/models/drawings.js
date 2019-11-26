const Sequelize = require('sequelize')
const db = require('../db')

const Drawing = db.define('drawing', {
  lines: {
    type: Sequelize.TEXT
  }
})

Drawing.beforeValidate(async (drawing, options) => {
  try {
    drawing.lines = JSON.stringify(drawing.lines)
    // await drawing.save()
    console.log('this is what drawing is', typeof drawing.lines)
    return drawing
  } catch (error) {
    console.error(error)
  }
})

module.exports = Drawing
