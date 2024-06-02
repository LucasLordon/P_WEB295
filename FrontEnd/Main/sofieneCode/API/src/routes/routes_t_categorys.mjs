import express from "express";
import { success } from "./helper.mjs";
import { modelCategory } from "../db/sequelize.mjs";
import { ValidationError, Op } from "sequelize";
import { auth } from "../auth/auth.mjs";
import { modelBook } from "../db/sequelize.mjs";

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
  modelCategory.findAll({ order: ["category"] }).then((categorys) => {
    const message = "La liste des categories a bien été récupérée.";
    res.json(success(message, categorys));
  })
    .catch((error) => {
      const message =
        "La liste des categories n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});
categorysRouter.get("/booksCategorys", (req, res) => {
  if (req.body) {
    return modelCategory.findOne({
      where: { category: { [Op.like]: `%${req.body.category}%` } },
    }).then((categorieFinded) => {
      modelBook.findAll({
        where: { categories_id: { [Op.eq]: categorieFinded.id } },
      }).then((books) => {
        if (categorieFinded.id !== null) {
          const message = `Voici tout les livre ayant comme catégorie ${req.body.category}`;
          res.json(success(message, books));
          console.log(categorieFinded.id);
        }
        else {
          return
        }
      });
    }).catch((error) => {
      const message = "La liste des categories n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    })
  }
});
categorysRouter.get("/categoriesName",(req, res) => {
  if (req.query.category) {
    return modelCategory.findOne({
      where: { category: { [Op.like]: `%${req.query.category}%` } },
    }).then((categorieFinded) => {
      const message ="Voici la liste des catégories"
      res.json({message, data: categorieFinded})
    }).catch((error) => {
      const message = "La liste des categories n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    })
  }
});
categorysRouter.get("/:id?/books/", async (req, res) => {
  const categoryId = req.params.id;

  if (!categoryId) {
    // Si aucun ID de catégorie n'est fourni, retourner tous les livres
    return modelBook.findAndCountAll({
      order: ["title"],
    })
    .then((modelBook) => {
      const message = `La liste de tous les livres a bien été récupérée.`;
      res.json({ message, data: modelBook });
    })
    .catch((error) => {
      const message =
        "La liste des livres n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
  }

  // Si un ID de catégorie est fourni, retourner les livres de cette catégorie
  modelCategory.findByPk(categoryId)
    .then((category) => {
      if (category === null) {
        const message =
          "La categorie demandée n'existe pas. Merci de réessayer avec un autre identifiant.";
        return res.status(404).json({ message });
      }
      return modelBook.findAndCountAll({
        where: {
          categories_id: category.id,
        },
        order: ["title"],
      }).then((modelBook) => {
        let message;
        if (modelBook.count === 0) {
          message = `Il n'y a pas de livres pour la catégorie dont l'id vaut ${category.id}.`;
        } else {
          message = `La liste des livres de la catégorie dont l'id vaut ${category.id} a bien été récupérée.`;
        }
        res.json({ message, data: modelBook });
      });
    })
    .catch((error) => {
      const message =
        "La liste des livres de la catégorie n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

//// Get one category by id

categorysRouter.get("/:id", /*auth,*/ (req, res) => {
  modelCategory
    .findByPk(req.params.id)
    .then((category) => {
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

categorysRouter.post("/", /*auth,*/ (req, res) => {
  modelCategory.findOne({
    where: { category: { [Op.like]: `%${req.body.category}%` } },
  }).then((category) => {
    if (category === null) {
      modelCategory
        .create(req.body)
        .then((createdCategory) => {
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
    }
    else{
      res.status(409).json({message:"La catégorie existet déjà"})
    }
  })
});

//// Delete a category
//curl -X DELETE http://localhost:3000/api/categorys/1
categorysRouter.delete("/:id", auth, (req, res) => {
  modelCategory
    .findByPk(req.params.id)
    .then((deletedCategory) => {
      if (deletedCategory === null) {
        const message =
          "Le la categorie demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
        return res.status(404).json({ message });
      }
      return modelCategory
        .destroy({
          where: { id: deletedCategory.id },
        })
        .then((_) => {
          const message = `La categorie [${deletedCategory.category}] a bien été supprimé !`;
          res.json(success(message, deletedCategory));
        });
    })
    .catch((error) => {
      const message =
        "Le produit n'a pas pu être supprimé. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

//Put a category

categorysRouter.put("/:id", auth, (req, res) => {
  const categoryId = req.params.id;
  modelCategory
    .update(req.body, { where: { id: categoryId } })
    .then((_) => {
      return Product.findByPk(productId).then((updatedCategory) => {
        if (updatedCategory === null) {
          const message =
            "La categorie demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
          return res.status(404).json({ message });
        }
        const message = `La categorie : [${updatedCategory.category}], dont l'id vaut ${updatedCategory.id} a été mis à jour avec succès`;
        res.json(success(message, updatedCategory));
      });
    })
    .catch((error) => {
      const message =
        "La categorie n'a pas pu être mis à jour. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});



export { categorysRouter };
