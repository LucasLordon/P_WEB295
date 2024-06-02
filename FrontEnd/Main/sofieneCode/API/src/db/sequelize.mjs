import { DataTypes, Sequelize } from "sequelize"; // Import ORM
import bcrypt from 'bcrypt'; // Import bcrypt for password hashing

// Import data
import { dataCustomers } from "./mock-customer.mjs";
import { dataBooks } from "../db/mock-book.mjs";
import { dataCategory } from "../db/mock-category.mjs";
import { dataComment } from "./mock-comment.mjs";
import { dataAuthor } from "./mock-author.mjs";
import { dataWriting } from "./mock-writing.mjs";

// Import models
import { CustomerModel } from "../model/t_customer.mjs";
import { BookModel } from "../model/t_books.mjs";
import { CategoryModel } from "../model/t_categorys.mjs";
import { Authormodel } from "../model/t_authors.mjs";
import { CommentModel } from "../model/t_comments.mjs";
import { WritingModel } from "../model/t_writing.mjs";

const sequelize = new Sequelize(
    "db_librairie",
    "root",
    "root",
    {
        host: "localhost",
        port: 6033,
        dialect: "mysql",
        logging: console.log, // Enable logging
    }
);

// Transform models into Sequelize models
const modelCustomer = CustomerModel(sequelize, DataTypes);
const modelBook = BookModel(sequelize, DataTypes);
const modelCategory = CategoryModel(sequelize, DataTypes);
const modelComment = CommentModel(sequelize, DataTypes);
// const modelWriting = WritingModel(sequelize, DataTypes);
const modelAuthor = Authormodel(sequelize, DataTypes);

// Function to create the database (used in app.mjs)
let initDB = () => {
    createForeignKeys(); // Create foreign keys
    return sequelize
        .sync({ force: true })
        .then((_) => {
            importCustomer();
            importCategory();
            importBooks();
            importAuthor();
            importComment();
            // importWriting();
            console.log("La base de donnée db_librairie a bien été créé");
        })
        .catch((error) => console.error('Error initializing the database:', error));
};

const createForeignKeys = () => {
    modelCategory.hasMany(modelBook, {
        foreignKey: "categories_id",
    });

    modelBook.belongsTo(modelCategory, {
        foreignKey: "categories_id",
    });

    modelBook.hasMany(modelComment, {
        foreignKey: "books_id",
    });

    modelComment.belongsTo(modelBook, {
        foreignKey: "books_id",
    });

    // modelBook.belongsToMany(modelAuthor, { through: modelWriting });
    // modelAuthor.belongsToMany(modelBook, { through: modelWriting });
};

const importCustomer = () => {
    dataCustomers.forEach((customer) => {
        bcrypt
            .hash(customer.mot_de_passe, 10)
            .then((hash) => {
                return modelCustomer.create({
                    pseudo: customer.pseudo,
                    date_entree: customer.date_entree,
                    mot_de_passe: hash
                });
            })
            .then((customer) => console.log(customer.toJSON()))
            .catch((error) => console.error('Error inserting customer:', error));
    });
};

const importBooks = () => {
    dataBooks.forEach((book) => {
        modelBook.create({
            price: book.price,
            title: book.title,
            image: book.image,
            categories_id: book.categories_id,
            customers_id: book.customers_id,
            authors_id: book.authors_id,
            page_count: book.page_count,
            summary: book.summary
        })
        .then((book) => console.log(book.toJSON()))
        .catch((error) => console.error('Error inserting book:', error));
    });
};

const importCategory = () => {
    dataCategory.forEach((category) => {
        modelCategory.create({
            category: category.category,
        })
        .then((category) => console.log(category.toJSON()))
        .catch((error) => console.error('Error inserting category:', error));
    });
};

const importAuthor = () => {
    dataAuthor.forEach((author) => {
        modelAuthor.create({
            id: author.id, // Ensure the id is explicitly set
            name: author.name,
            firstName: author.firstName,
        })
        .then((author) => console.log(author.toJSON()))
        .catch((error) => console.error('Error inserting author:', error));
    });
};

const importComment = () => {
    dataComment.forEach((comment) => {
        modelComment.create({
            comment: comment.comment,
            appreciation: comment.appreciation,
            books_id: comment.books_id,
            com_customers_id: comment.com_customers_id,
        })
        .then((comment) => console.log(comment.toJSON()))
        .catch((error) => console.error('Error inserting comment:', error));
    });
};

// const importWriting = () => {
//     dataWriting.forEach((writing) => {
//         modelWriting.create({
//             authors_id: writing.authors_id,
//             books_id: writing.books_id,
//         })
//         .then((writing) => console.log(writing.toJSON()))
//         .catch((error) => console.error('Error inserting writing:', error));
//     });
// };

export { sequelize, initDB, modelCustomer, modelBook, modelCategory, modelComment, modelAuthor };
