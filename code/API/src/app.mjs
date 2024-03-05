import express from "express";
import { usersRouter } from "./routes/users.mjs";
import { initDB, sequelize } from "./db/sequelize.mjs";
import { loginRouter } from "./routes/login.mjs";
import { booksRouter } from "./routes/routes_t_books.mjs";
import { categorysRouter } from "./routes/routes_t_categorys.mjs";


const app = express();
const port = 3000;
 sequelize
    .authenticate()
    .then((_) => console.log("la connexion à la base de donnée à bien été établie")
    )
    .catch((error) => console.error("Impossible de se connecter à la db"));
initDB();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API REST of a virtual library !");
});
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
app.get("/api/", (req, res) => {
  res.redirect(`http://localhost:${port}`);
});
app.use("/api/users", usersRouter);
app.use("/api/login",loginRouter);

app.use("/api/books", booksRouter);
app.use("/api/categorys", categorysRouter);

app.use(({res}) => {
  const message = "Impossible de trouver la ressource demandée ! Veuillez essayer une autre URL";
  res.status(404).json(message);
});

