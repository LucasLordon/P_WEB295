import express from "express";
import { dataUsers, getUser,removeUser,updateUser } from "../db/mock-user.mjs";
import { success,getUniqueUserId } from "./helper.mjs";
import { UserTable } from "../db/sequelize.mjs";
import { Error } from "sequelize";

const usersRouter = express();

usersRouter.get("/",(req,res) => {
    UserTable.findAll().then((usersData) => {
        const message = "La liste des utilisateurs a bien été récupérée.";
        res.json(success(message, usersData));
    })  
});
usersRouter.get("/:id",(req,res) => {
    UserTable.findByPk(req.params.id).then((usersData) => {
        const message = `L'utilisateur dont l'id vaut ${usersData.id} a bien été récupéré.`;
        res.json(success(message,usersData))
    });
});

usersRouter.post("/",(req,res) => {
    UserTable.create(req.body).then((userCreated) => {
        const message = `L'utilisateur ${userCreated.pseudo} à bien été créé`;
        res.json(success(message,userCreated));
    })
});

usersRouter.delete("/:id",(req,res) => {
    let deletedUser;
    UserTable.findByPk(req.params.id).then((userDeleted) => {
        deletedUser = userDeleted;
        UserTable.destroy({
            where: {id: userDeleted.id },
        })
    }).then((_) => {
        const message = `L'utilisateur ${deletedUser.pseudo} à bien été supprimé`;
        res.json(success(message,deletedUser));
    }).catch((Error) => {
        const message = `L'utilisateur ${req.params.id} n'as pas été trouver`;
        res.json(success(message,Error));
    });
});

usersRouter.put("/:id",(req,res) => {
    let userID = req.params.id;
    UserTable.update(req.body, {where :{id: userID}}).then((_) => {
        UserTable.findByPk(userID).then((userFinded) => {
            const message = `L'utilisateur ${userFinded.pseudo} dont l'id vaut ${userID} a été mis à jour avec succès !`;
            res.json(success(message,userFinded));
        }).catch((Error) => {
            const message = `L'utilisateur ayant l'id ${userID} n'as pas pu être modifier`;
            res.json(success(message,Error));
        });
    });
});
export {usersRouter};