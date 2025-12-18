const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Prontuario = sequelize.define("prontuario", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    id_paciente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true
    },

    id_agendamento: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        foreignKey: true
    },

    diagnostico: {
        type: DataTypes.STRING,
        allowNull: false
    },

    observacoes: {
        type: DataTypes.TEXT
    }

}, {
    timestamps: false
});


module.exports = Prontuario;
