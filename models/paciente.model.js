const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Paciente = sequelize.define("paciente", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING,
        uniqueKey: true,
        allowNull: false
    }
}, 
{
    timestamps: false
});

module.exports = Paciente;