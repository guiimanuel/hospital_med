const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Cirurgia = sequelize.define("Cirurgia", {
    nome_paciente: {
        type: DataTypes.STRING,
        allowNull: false
        },
    tipo_cirurgia: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data_cirurgia: {
        type: DataTypes.DATE,
        allowNull: false
    }
});
module.exports = Cirurgia;