const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Paciente = require("../models/paciente.model");
const Medico = require("../models/medico.model");
const Internamento = sequelize.define("internamento", {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    id_paciente: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false
    },
    medico_resp:{
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true
    },
    quarto: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    data_entrada: {
        type: DataTypes.DATE,
        allowNull: false
    }
},
{
    timestamps: false
});
Internamento.belongsTo(Medico, { foreignKey:"medico_resp", targetKey: "id" });
Internamento.belongsTo(Paciente, { foreignKey:"id_paciente", targetKey: "id" });
module.exports = Internamento;