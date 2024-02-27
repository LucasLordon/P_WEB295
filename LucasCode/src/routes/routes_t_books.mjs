import express from "express";
import { dataBooks, getBook, removeBook, updateBook, getUniqueId } from "../db/mock-book.mjs";
import { success } from "./helper.mjs";

const booksRouter = express();

///// Get ALL books

booksRouter.get("/", (req, res) => {
    const message = "La liste des livres a bien été récupérée.";
    res.json(success(message, dataBooks));
});

//// Get one book by id

booksRouter.get("/:id", (req, res) => {
    const bookId = req.params.id;
    const book = dataBooks.find((book) => book.id == bookId);
    const message = `Le produit dont l'id vaut ${bookId} a bien été récupéré.`;
    res.json(success(message, book));
});

//// Poost a book
// Exemple of a post :
// curl -X POST http://localhost:3000/api/books -H "Content-Type: application/json" -d '{"name": "HamburgerVaudois","price": 9.99}'


booksRouter.post("/", (req, res) => {
    const id = getUniqueId(dataBooks);
    const createdBook = { ...req.body, ...{ id: id, created: new Date() } };
    dataBooks.push(createdBook);
    const message = `Le livre ${createdBook.name} a bien été créé !`;
    res.json(success(message, createdBook));
});

//// Delete a book
//curl -X DELETE http://localhost:3000/api/books/1
booksRouter.delete("/:id", (req, res) => {
    const bookId = req.params.id;
    let deletedBook = getBook(bookId);
    removeBook(bookId);
    // Définir un message pour le consommateur de l'API REST
    const message = `Le produit ${deletedBook.name} a bien été supprimé !`;
    // Retourner la réponse HTTP en json avec le msg et le produit créé
    res.json(success(message, deletedBook));
});

//Put a book

booksRouter.put("/:id", (req, res) => {
    const bookId = req.params.id;
    const book = getBook(bookId);
    const updatedBook = {
        id: bookId,
        ...req.body,
        created: book.created,
    };
    updateBook(bookId, updatedBook);
    const message = `Le livre ${updatedBook.name} dont l'id vaut ${bookId} a été mis à jour avec succès !`;
    res.json(success(message, updatedBook));
});

export { booksRouter };