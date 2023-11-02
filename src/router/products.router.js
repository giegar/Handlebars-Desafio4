
// --- Router
import { Router } from 'express';
const productRouter = Router();

// --- Product Manager
import productManager from '../controllers/productManager.js';
const products = new productManager("./src/models/products.json");

// --- Routes

productRouter.post("/", async (req, res) => {
    
    try{ 
        let newProduct = req.body
        res.send(await products.addProducts(newProduct))

    } catch(err) {
        res.status(500).json({ error: err.message })}
});

productRouter.get("/", async (req, res) => {

    try{ 
        res.send(await products.getProducts())

    } catch(err) {
        res.status(500).json({ error: err.message })}
});

productRouter.get("/:id", async (req, res) => {

    try{ 
        let id = parseInt(req.params.id);
        res.send(await products.getProductsById(id))

    } catch(err) {
        res.status(500).json({ error: err.message })}
});

productRouter.delete("/:id", async (req, res) => {

    try{ 
        let id = parseInt(req.params.id);
        res.send(await products.deleteProducts(id))

    } catch(err) {
        res.status(500).json({ error: err.message })}
});

productRouter.put("/:id", async (req, res) => {

    try{ 
        let id = parseInt(req.params.id);
        let update = req.body;
        res.send(await products.updateProduct(id, update))

    } catch(err) {
        res.status(500).json({ error: err.message })}
});

// --- Export Product Router
export default productRouter