import { DataTypes, Sequelize } from "sequelize";

const sequelize = new Sequelize(
    "db_librairieTest",
    "root",
    "root",
    {
        host: "localhost",
        port: 6033,
        dialect : "mysql",
        logging: false,
    }
);

import { dataUsers } from "./mock-user.mjs";
import { UserModel } from "../model/userModel.mjs";
const UserTable = UserModel(sequelize,DataTypes);

let initDB = () =>{
    return sequelize
    .sync({force:true})
    .then((_) => {
        importUser();
        console.log("la base de donnée db_librairie a bien été créé");
    });
};

const importUser = () => {
    dataUsers.map((user) => {
        UserTable.create({
            pseudo : user.pseudo,
            date_entree: user.date_entree,
            mot_de_passe: user.mot_de_passe
        }).then((user) => console.log(user.toJSON()));
    });
};
export {sequelize,initDB,UserTable};