const Sequelize = require("sequelize");

const sprayR = new Sequelize(`postgres://localhost:5432/spray-r`, {
  logging: false
});

module.exports = sprayR;
