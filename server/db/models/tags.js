const Sequelize = require("sequelize");
const db = require("../db");

const Tag = db.define("tag", {
  lines: {
    type: Sequelize.TEXT
  }
});

Tag.beforeValidate();

module.exports = Tag;
