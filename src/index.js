import express from "express";
import productRouter from "./router/products.router.js";
import cartRouter from "./router/carts.router.js";

import { engine } from "express-handlebars";
import * as path from "path";
import __dirname from "./utils.js";

// --- Product Manager
import productManager from "./controllers/productManager.js";
const products = new productManager("./src/models/products.json");

const app = express();

const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use("/api/products", productRouter)
app.use("/api/carts", cartRouter)

// Handlebars

app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname + "views"))

// Static
app.use("/", express.static(__dirname + "/public"))
app.get("/", async (req, res) => {
    let allProducts = await products.getProducts()
    res.render("home",{
        title: "E-commerce",
        products: allProducts
    })
})


app.listen(port, () => {
    console.log("Servidor express en puerto 8080")
})