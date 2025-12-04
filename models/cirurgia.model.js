const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Paciente = require("../models/paciente.model");
const Medico = require("../models/medico.model");
const Cirurgia = sequelize.define("cirurgia", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    id_paciente:{
        foreignKey: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    medico_resp:{
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true
    },
    tipo_cirurgia: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data_cirurgia: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, 
{
    timestamps: false
});
Cirurgia.belongsTo(Medico, { foreignKey:"medico_resp", targetKey: "id" });
Cirurgia.belongsTo(Paciente, { foreignKey:"id_paciente", targetKey: "id" });
module.exports = Cirurgia;