const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Medico = sequelize.define("medico", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    crm:{
        type: DataTypes.INTEGER(10),
        uniqueKey: true,
        allowNull: false
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idade: {
        type: DataTypes.INTEGER(2),
        allowNull: false
    },
    especializacao: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});

module.exports = Medico;