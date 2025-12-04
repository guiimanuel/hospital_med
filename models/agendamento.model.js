const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Paciente = require("../models/paciente.model");
const Medico = require("../models/medico.model");
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
Agendamento.belongsTo(Medico, { foreignKey:"id_medico", targetKey: "id" });
Agendamento.belongsTo(Paciente, { foreignKey:"id_paciente", targetKey: "id" });
module.exports = Agendamento;