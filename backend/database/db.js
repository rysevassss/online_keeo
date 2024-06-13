const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:8888@localhost:5432/keeo', {
    define: {
    timestamps: false
  }
});

module.exports = sequelize;