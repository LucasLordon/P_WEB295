import express from "express";
import { success } from "./helper.mjs";
import { modelCategory } from "../db/sequelize.mjs";
import { ValidationError, Op } from 'sequelize';

const categorysRouter = express();

///// Get ALL categorys

categorysRouter.get("/", (req, res) => {
    if (req.query.category) {
        if (req.query.category.length < 2) {
            const message = `Le terme de la recherche doit contenir au moins 2 caractères`;
            return res.status(400).json({ message });
            }
        let limit = 3;
        if (req.query.limit) {
            limit = parseInt(req.query.limit);
        }
        return modelCategory.findAndCountAll({
            where: { category: { [Op.like]: `%${req.query.category}%` } },
            order: ["category"],
            limit: limit,
        }).then((categorys) => {
            const message = `Il y a ${categorys.count} categories qui correspondent au terme de la recherche`;
            res.json(success(message, categorys));
        });
    }
    modelCategory.findAll({order:["category"]}).then((categorys) => {
        const message = "La liste des categories a bien été récupérée.";
        res.json(success(message, categorys));
    })
        .catch((error) => {
            const message =
                "La liste des categories n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
            res.status(500).json({ message, data: error });
        });
});

//// Get one category by id

categorysRouter.get("/:id", (req, res) => {
    modelCategory.findByPk(req.params.id).then((category) => {
        if (category === null) {
            const message =
                "La categorie demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
            return res.status(404).json({ message });
        }
        const message = `La categorie dont l'id vaut ${category.id} a bien été récupéré.`;
        res.json(success(message, category));
    })
        .catch((error) => {
            const message =
                "La categorie  n'a pas pu être récupéré. Merci de réessayer dans quelques instants.";
            res.status(500).json({ message, data: error });
        });
});


//// Poost a category
// Exemple of a post :
// curl -X POST http://localhost:3000/api/categorys -H "Content-Type: application/json" -d '{"name": "HamburgerVaudois","price": 9.99}'


categorysRouter.post("/", (req, res) => {
    modelCategory.create(req.body).then((createdCategory) => {
        const message = `La categorie [${createdCategory.category}] a bien été créé !`;
        res.json(success(message, createdCategory));
    })
        .catch((error) => {
            if (error instanceof ValidationError) {
                return res.status(400).json({ message: error.message, data: error });
            }
            const message =
                "La categorie  n'a pas pu être ajouté. Merci de réessayer dans quelques instants.";
            res.status(500).json({ message, data: error });
        });
});

//// Delete a category
//curl -X DELETE http://localhost:3000/api/categorys/1
categorysRouter.delete("/:id", (req, res) => {
    modelCategory.findByPk(req.params.id)
        .then((deletedCategory) => {
            if (deletedCategory === null) {
                const message =
                    "Le la categorie demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
                return res.status(404).json({ message });
            }
            return modelCategory.destroy({
                where: { id: deletedCategory.id },
            }).then((_) => {
                const message = `La categorie [${deletedCategory.category}] a bien été supprimé !`;
                res.json(success(message, deletedCategory));
            });
        })
        .catch((error) => {
            const message = "Le produit n'a pas pu être supprimé. Merci de réessayer dans quelques instants.";
            res.status(500).json({ message, data: error });
        });
});


//Put a category

categorysRouter.put("/:id", (req, res) => {
    const categoryId = req.params.id;
    modelCategory.update(req.body, { where: { id: categoryId } })
        .then((_) => {
            return Product.findByPk(productId).then((updatedCategory) => {
                if (updatedCategory === null) {
                    const message = "La categorie demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
                    return res.status(404).json({ message });
                }
                const message = `La categorie : [${updatedCategory.category}], dont l'id vaut ${updatedCategory.id} a été mis à jour avec succès`;
                res.json(success(message, updatedCategory));
            });
        })
        .catch((error) => {
            const message = "La categorie n'a pas pu être mis à jour. Merci de réessayer dans quelques instants.";
            res.status(500).json({ message, data: error });
        });
});


export { categorysRouter };