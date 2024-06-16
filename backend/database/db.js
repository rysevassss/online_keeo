const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:8888@localhost:5432/keeoshop', {
    define: {
    timestamps: false
  }
});

module.exports = sequelize;