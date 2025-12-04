const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Medico = sequelize.define("Medico", {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
        },
    idade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    especializacao: {
        type: DataTypes.STRING,
        allowNull: false
    }
});
module.exports = Medico;