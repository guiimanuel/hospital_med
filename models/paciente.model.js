const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Paciente = sequelize.define("paciente", {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
        },
    idade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cpf: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});
module.exports = Paciente;