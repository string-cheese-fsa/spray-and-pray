const Sequelize = require('sequelize')
const db = require('../db')

const Drawing = db.define('drawing', {
  lines: {
    type: Sequelize.TEXT
  },
  latitude: {
    type: Sequelize.FLOAT
  },
  longitude: {
    type: Sequelize.FLOAT
  },
  title: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  }
})

Drawing.beforeValidate(async (drawing, options) => {
  try {
    drawing.lines = JSON.stringify(drawing.lines)
    return drawing
  } catch (error) {
    console.error(error)
  }
})

module.exports = Drawing
