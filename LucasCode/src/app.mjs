import express from "express";
import { booksRouter } from "./routes/routes_t_books.mjs";
const app = express();
app.use(express.json());
const port = 3000;

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
