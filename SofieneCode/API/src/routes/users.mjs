import express from "express";
import { dataUsers, getUser,removeUser,updateUser } from "../db/mock-user.mjs";
import { success,getUniqueUserId } from "./helper.mjs";

const usersRouter = express();

usersRouter.get("/",(req,res) => {
    const message = "La liste des produits a bien été récupérée.";
    res.json(success(message, dataUsers));
});
usersRouter.get("/:id",(req,res) => {
    let userID = req.params.id;
    let dataUserFind = dataUsers.find((user) => user.id == userID);
    const message = `Le produit dont l'id vaut ${dataUserFind} a bien été récupéré.`;
    res.json(success(message,dataUserFind))
});
usersRouter.post("/",(req,res) => {
    const id = getUniqueUserId(dataUsers)
    let createdUser = {...req.body, ...{id: id, Date: new Date()}};
    dataUsers.push(createdUser);
    const message = `L'utilisateur ${createdUser.pseudo} à bien été créé`;
    res.json(success(message,createdUser));
});

usersRouter.delete("/:id",(req,res) => {
    let userID = req.params.id
    let deletedUser = getUser(userID);
    removeUser(userID);
    const message = `L'utilisateur ${deletedUser.pseudo} à bien été supprimé`;
    res.json(success(message,deletedUser));
});

usersRouter.put("/:id",(req,res) => {
    let userID = req.params.id;
    let user = getUser(userID);

    const updatedUser = {
        id: userID,
        ...req.body,
        created: user.created
    };
    updateUser(userID, updatedUser);
    const message = `Le produit ${user.pseudo} dont l'id vaut ${userID} a été mis à jour avec succès !`;
    res.json(success(message,updatedUser));
});
export {usersRouter};