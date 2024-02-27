import { Sequelize, DataTypes } from "sequelize";
import { BookModel } from "../models/t_books.mjs";
import { dataBooks } from "../db/mock-book.mjs";

const sequelize = new Sequelize(
    "db_librairie", // Nom de la DB qui doit exister
    "root", // Nom de l'utilisateur
    "root", // Mot de passe de l'utilisateur
    {
        host: "localhost",
        port: "6033", //pour les conteneurs docker MySQL
        dialect: "mysql",
        logging: false,
    }
);

// Le modèle product
const modelBook = BookModel(sequelize, DataTypes);

let initDb = () => {
    return sequelize
        .sync({ force: true }) // Force la synchro => donc supprime les données également
        .then((_) => {
            importBooks();
            console.log("La base de données db_products a bien été synchronisée");
        });
};
const importBooks = () => {
    // import tous les produits présents dans le fichier db/mock-product
    dataBooks.map((book) => {
        modelBook.create({
            price: book.price,
            title:book.title,
            excerpt:book.excerpt,
            image:book.image,
            category:book.category,
            page_count:book.page_count,
            summary:book.summary
        }).then((book) => console.log(book.toJSON()));
    });
};
export { sequelize, initDb, modelBook };