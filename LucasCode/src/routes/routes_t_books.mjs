import express from "express";
import { success } from "./helper.mjs";
import { modelBook } from "../db/sequelize.mjs";

const booksRouter = express();

///// Get ALL books

booksRouter.get("/", (req, res) => {
    modelBook.findAll().then((books) => {
        const message = "La liste des livres a bien été récupérée.";
        res.json(success(message, books));
    });
});

//// Get one book by id

booksRouter.get("/:id", (req, res) => {
    modelBook.findByPk(req.params.id).then((book) => {
        const message = `Le livre dont l'id vaut ${book.id} a bien été récupéré.`;
        res.json(success(message, book));
    });
});


//// Poost a book
// Exemple of a post :
// curl -X POST http://localhost:3000/api/books -H "Content-Type: application/json" -d '{"name": "HamburgerVaudois","price": 9.99}'


booksRouter.post("/", (req, res) => {
    modelBook.create(req.body).then((createdBook) => {
        // Définir un message pour le consommateur de l'API REST
        const message = `Le livre ${createdBook.name} a bien été créé !`;
        // Retourner la réponse HTTP en json avec le msg et le produit créé
        res.json(success(message, createdBook));
    });
});

//// Delete a book
//curl -X DELETE http://localhost:3000/api/books/1
booksRouter.delete("/:id", (req, res) => {
    modelBook.findByPk(req.params.id).then((deletedBook) => {
        modelBook.destroy({
            where: { id: deletedBook.id },
        }).then((_) => {
            // Définir un message pour le consommateur de l'API REST
            const message = `Le livre ${deletedBook.name} a bien été supprimé !`;
            // Retourner la réponse HTTP en json avec le msg et le produit créé
            res.json(success(message, deletedBook));
        });
    });
});


//Put a book

booksRouter.put("/:id", (req, res) => {
    const bookId = req.params.id;
    modelBook.update(req.body, { where: { id: bookId } }).then((_) => {
        modelBook.findByPk(bookId).then((updatedBook) => {
            // Définir un message pour l'utilisateur de l'API REST
            const message = `Le livre ${updatedBook.name} dont l'id vaut ${updatedBook.id} a été mis à jour avec succès`;
            // Retourner la réponse HTTP en json avec le msg et le produit créé
            res.json(success(message, updatedBook));
        });
    });
});


export { booksRouter };