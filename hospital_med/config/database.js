const Sequelize = require("sequelize");

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./hospitalMed.sqlite"
});

module.exports = sequelize;