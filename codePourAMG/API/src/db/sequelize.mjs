import { DataTypes, Sequelize } from "sequelize";

import { dataCustomers } from "./mock-customer.mjs";
import { dataBooks } from "../db/mock-book.mjs";
import { dataCategory } from "../db/mock-category.mjs";
import { dataComment } from "./mock-comment.mjs";

import { CustomerModel } from "../model/t_customer.mjs";
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
        // logging: false,
        logging: console.log,
    }
);

const modelCustomer = CustomerModel(sequelize,DataTypes);
const modelBook = BookModel(sequelize, DataTypes);
const modelCategory = CategoryModel(sequelize, DataTypes);
const modelComment = CommentModel(sequelize,DataTypes);

// modelCategory.hasMany(modelBook,{
//     foreignKey: "categories_id",
// })

// modelBook.belongsTo(modelCategory, {
//     foreignKey: "categories_id",
// })

// modelBook.hasMany(modelComment,{
//     foreignKey: "books_id",
// })

// modelComment.belongsTo(modelBook, {
//     foreignKey: "books_id",
// })



// modelCustomer.hasMany(modelComment,{
//     foreignKey: "customers_id",
// })

// modelComment.belongsTo(modelCustomer, {
//     foreignKey: "customers_id",
// })

let initDB = () =>{
    createForeignKeys();
    return sequelize
    .sync({force:true})
    .then((_) => {
         importCustomer();
         importCategory();
         importBooks();
         importComment();
        console.log("La base de donnée db_librairie a bien été créé");
    });
};

// let initDB = async () => {
//     createForeignKeys();
//     try {
//         await sequelize.sync({ force: true });
//         await importCustomer();
//         await importCategory();
//         await importBooks();
//         await importComment();
//         console.log("La base de donnée db_librairie a bien été créé");
//     } catch (error) {
//         console.error("Error initializing database:", error);
//     }
// };


const createForeignKeys = () => {
    // modelCustomer.hasMany(modelBook, {
    //     foreignKey: "customers_id",
    // });

    /////////////////// Good relation ///////////////////

                    // modelBook.belongsTo(modelCustomer, {
                    //     foreignKey: "customers_id",
                    // });

                    // modelCustomer.hasMany(modelBook, {
                    //     foreignKey: "customers_id",
                    // });
                    
    /////////////////////////////////////////////////////
    
    modelCategory.hasMany(modelBook,{
        foreignKey: "categories_id",
    });
    
    modelBook.belongsTo(modelCategory, {
        foreignKey: "categories_id",
    });
    
    modelBook.hasMany(modelComment,{
        foreignKey: "books_id",
    });
    
    modelComment.belongsTo(modelBook, {
        foreignKey: "books_id",
    });
};



const importCustomer = () => {
    dataCustomers.map((customer) => {
        bcrypt
        .hash(customer.mot_de_passe,10)
        .then((hash) => {
            modelCustomer.create({
                pseudo : customer.pseudo,
                date_entree: customer.date_entree,
                mot_de_passe: hash
            }).then((customer) => console.log(customer.toJSON()));
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
            customers_id:book.customers_id,
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
            com_customers_id:comment.com_customers_id,
        }).then((comment) => console.log(comment.toJSON()));
    });
};

export {sequelize,initDB,modelCustomer,  modelBook, modelCategory,modelComment};