import { DataTypes, Sequelize } from "sequelize";

import { dataUsers } from "./mock-user.mjs";
import { dataBooks } from "../db/mock-book.mjs";
import { dataCategory } from "../db/mock-category.mjs";
import { dataComment } from "./mock-comment.mjs";

import { UserModel } from "../model/userModel.mjs";
import { BookModel } from "../model/t_books.mjs";
import { CategoryModel } from "../model/t_categorys.mjs";
import { CommentModel } from "../model/t_comments.mjs";

import bcrypt from 'bcrypt';

const sequelize = new Sequelize(
    "db_librairie",
    "root",
    "root",
    {
        host: "localhost",
        port: 6033,
        dialect : "mysql",
        logging: false,
    }
);

const UserTable = UserModel(sequelize,DataTypes);
const modelBook = BookModel(sequelize, DataTypes);
const modelCategory = CategoryModel(sequelize, DataTypes);
const modelComment = CommentModel(sequelize,DataTypes);

modelCategory.hasMany(modelBook,{
    foreignKey: "categories_id",
})

modelBook.belongsTo(modelCategory, {
    foreignKey: "categories_id",
})


// modelBook.hasMany(modelComment,{
//     foreignKey: "books_id",
// })

// modelComment.belongsTo(modelBook, {
//     foreignKey: "books_id",
// })

// UserTable.hasMany(modelBook,{
//     foreignKey: "users_id",
// })

// modelBook.belongsTo(UserTable, {
//     foreignKey: "users_id",
// })

// UserTable.hasMany(modelComment,{
//     foreignKey: "users_id",
// })

// modelComment.belongsTo(UserTable, {
//     foreignKey: "users_id",
// })

let initDB = () =>{
    return sequelize
    .sync({force:true})
    .then((_) => {
        importCategory();
        importBooks();
        importUser();
        importComment();
        console.log("la base de donnée db_librairie a bien été créé");
    });
};

const importUser = () => {
    dataUsers.map((user) => {
        bcrypt
        .hash(user.mot_de_passe,10)
        .then((hash) => {
            UserTable.create({
                pseudo : user.pseudo,
                date_entree: user.date_entree,
                mot_de_passe: hash
            }).then((user) => console.log(user.toJSON()));
        })
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
            users_id:book.users_id,
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

const importComment = () => {
    // import tous les produits présents dans le fichier db/mock-product
    dataComment.map((comment) => {
        modelComment.create({
            comment: comment.comment,
            books_id:comment.books_id,
            users_id:comment.users_id,
        }).then((comment) => console.log(comment.toJSON()));
    });
};

export {sequelize,initDB,UserTable,  modelBook, modelCategory,modelComment};