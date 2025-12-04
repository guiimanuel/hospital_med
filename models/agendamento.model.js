const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const agendamentos = sequelize.define("agendamento", {
    nome_paciente: {
        type: DataTypes.STRING,
        allowNull: false
        },
    hora_inicio: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    especializacao: {
        type: DataTypes.STRING,
        allowNull: false
    }
});
module.exports = agendamentos;