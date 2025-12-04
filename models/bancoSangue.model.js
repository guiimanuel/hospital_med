const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const BancoSangue = sequelize.define("bancoSangue", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    tipo_sangue: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
});

module.exports = BancoSangue;