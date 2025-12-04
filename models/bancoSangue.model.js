const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const BancoSangue = sequelize.define("BancoSangue", {
    tipo_sangue: {
        type: DataTypes.STRING,
        allowNull: false
        },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});
module.exports = BancoSangue;