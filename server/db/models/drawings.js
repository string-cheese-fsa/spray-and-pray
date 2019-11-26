const Sequelize = require('sequelize')
const db = require('../db')

const Drawing = db.define('drawing', {
  lines: {
    type: Sequelize.TEXT
  }
})

Drawing.beforeValidate((drawing, options) => {
  drawing.lines = drawing.lines.toString()
})

module.exports = Drawing
