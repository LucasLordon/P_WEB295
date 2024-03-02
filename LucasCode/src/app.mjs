import express from "express";
import { booksRouter } from "./routes/routes_t_books.mjs";
import { initDb, sequelize } from "./db/sequelize.mjs";

const app = express();
app.use(express.json());
const port = 3000;

sequelize
    .authenticate()
    .then((_) =>
        console.log("La connexion à la base de données a bien été établie")
    )
    .catch((error) => console.error("Impossible de se connecter à la DB"));

initDb();

app.get("/", (req, res) => {
    res.send("API REST of a virtual library !");
});

app.get("/api/", (req, res) => {
    res.redirect(`http://localhost:${port}/`);
});

app.use("/api/books", booksRouter);
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});

app.use(({ res }) => {
    const message =
        "Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.";
    res.status(404).json(message);
});