const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Agendamento = sequelize.define("agendamento", {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    id_paciente: {
        type: DataTypes.INTEGER,
        uniqueKey: true,
        foreignKey: true,
        allowNull: false
    },
    hora_inicio: {
        type: DataTypes.DATE,
        allowNull: false
    },
    id_medico:{
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true
    }
}, {
    timestamps: false
});

module.exports = Agendamento;