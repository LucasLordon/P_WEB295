import { Sequelize, DataTypes } from "sequelize";
import { BookModel } from "../models/t_books.mjs";
import { CategoryModel } from "../models/t_categorys.mjs";
import { dataBooks } from "../db/mock-book.mjs";
import { dataCategory } from "./mock-category.mjs";

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

// Le modèle Book
const modelBook = BookModel(sequelize, DataTypes);
const modelCategory = CategoryModel(sequelize, DataTypes);

modelCategory.hasMany(modelBook,{
    foreignKey: "categories_id",
})

modelBook.belongsTo(modelCategory, {
    foreignKey: "categories_id",
})


let initDb = () => {
    return sequelize
        .sync({ force: true }) // Force la synchro => donc supprime les données également
        .then((_) => {
            importCategory();
            importBooks();
            console.log("La base de données db_librairie a bien été synchronisée");
        });
};
const importBooks = () => {
    // import tous les produits présents dans le fichier db/mock-product
    dataBooks.map((book) => {
        modelBook.create({
            price: book.price,
            title: book.title,
            image: book.image,
            categories_id: book.categories_id,
            page_count: book.page_count,
            summary: book.summary
        }).then((book) => console.log(book.toJSON()));
    });
};

const importCategory = () => {
    // import tous les produits présents dans le fichier db/mock-product
    dataCategory.map((category) => {
        modelCategory.create({
            category: category.category,
        }).then((category) => console.log(category.toJSON()));
    });
};

export { sequelize, initDb, modelBook, modelCategory };