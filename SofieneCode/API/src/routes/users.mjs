import express from "express";
import { success, getUniqueUserId } from "./helper.mjs";
import { UserTable } from "../db/sequelize.mjs";
import { BaseError, Error, ValidationError, Op } from "sequelize";
import { auth } from "../auth/auth.mjs";
import bcrypt from "bcrypt";

const usersRouter = express();

usersRouter.get("/", auth, (req, res) => {
  if (req.query.pseudo) {
    if (req.query.pseudo.length < 2) {
      const message = "Veuillez faire une recherche a plus de 1 caractère";
      return res.status(400).json({ message });
    }
    let dynamicLimit = 5;
    if (req.query.limit) {
      dynamicLimit = parseInt(req.query.limit);
    }
    return UserTable.findAll({
      where: { pseudo: { [Op.like]: `%${req.query.pseudo}%` } },
      order: ["pseudo"],
      limit: dynamicLimit,
    }).then((usersList) => {
      const message = `Il y a ${usersList.length} utilisateurs qui correspondent à votre recherche`;
      res.json(success(message, usersList));
    });
  }
  UserTable.findAll()
    .then((usersData) => {
      const message = "La liste des utilisateurs a bien été récupérée.";
      res.json(success(message, usersData));
    })
    .catch((error) => {
      const message =
        "La liste des utilisateur n'a pas pu être récupérée. Merci de réessayer dans quelques instants";
      res.status(500).json({ message, data: error });
    });
});
usersRouter.get("/:id", auth, (req, res) => {
  UserTable.findByPk(req.params.id)
    .then((usersData) => {
      const message = `L'utilisateur dont l'id vaut ${usersData.id} a bien été récupéré.`;
      res.json(success(message, usersData));
    })
    .catch((error) => {
      const message = `L'utilisateur ayant l'id ${req.params.id} n'as pas pu être trouver`;
      res.status(404).json({ message, data: error });
    });
});

usersRouter.post("/", (req, res) => {
  bcrypt.hash(req.body.mot_de_passe, 10).then((hashedPWD) => {
    req.body.mot_de_passe = hashedPWD;
    UserTable.create(req.body)
      .then((userCreated) => {
        const message = `L'utilisateur ${userCreated.pseudo} à bien été créé`;
        res.json(success(message, userCreated));
      })
      .catch((error) => {
        const message = `L'utilisateur n'a pas pu être ajouter`;
        res.status(500).json({ message, data: error });
      });
  });
});

usersRouter.delete("/:id", auth, (req, res) => {
  let deletedUser;
  UserTable.findByPk(req.params.id)
    .then((userDeleted) => {
      deletedUser = userDeleted;
      if (userDeleted == null) {
        const message = `L'utilisateur ${req.params.id} n'as pas été trouvé`;
        res.status(404).json({ message, data: error });
      }
      return UserTable.destroy({
        where: { id: userDeleted.id },
      });
    })
    .then((_) => {
      const message = `L'utilisateur ${deletedUser.pseudo} à bien été supprimé`;
      res.json(success(message, deletedUser));
    })
    .catch((error) => {
      const message = `L'utilisateur ${req.params.id} n'as pas pu être supprimé`;
      return res.status(500).json({ message, data: error });
    });
});

usersRouter.put("/:id", auth, (req, res) => {
  let userID = req.params.id;
  UserTable.update(req.body, { where: { id: userID } })
    .then((_) => {
      return UserTable.findByPk(userID).then((userFinded) => {
        if (userFinded == null) {
          const message = `L'utilisateur ayant l'id ${userID} n'as pas pu être trouvé`;
          return res.status(404).json({ message });
        }
        const message = `L'utilisateur ${userFinded.pseudo} dont l'id vaut ${userID} a été mis à jour avec succès !`;
        res.json(success(message, userFinded));
      });
    })
    .catch((error) => {
      const message = `L'utilisateur ayant l'id ${userID} n'as pas pu être modifier`;
      if (error instanceof ValidationError) {
        return res.status(500).json({ message, data: error });
      }
      res.status(500).json({ message, data: error });
    });
});
export { usersRouter };
