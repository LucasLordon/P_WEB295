import { DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize.mjs";

const UserModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      pseudo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date_entree: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      mot_de_passe: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    }
  );
};
export {UserModel};
