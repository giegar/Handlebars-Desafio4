// --- Router
import { Router } from 'express';
const cartRouter = Router();

// --- Cart Manager
import cartManager from '../controllers/cartManager.js';
const carts = new cartManager("./src/models/carts.json");

// --- Routes

cartRouter.post("/", async (req, res) => {

    try{ 
        res.send(await carts.addCarts())

    } catch(err) {
        res.status(500).json({ error: err.message })}
})

cartRouter.get("/", async (req, res) => {

    try{ 
        res.send(await carts.getCarts())

    } catch(err) {
        res.status(500).json({ error: err.message })}
})

cartRouter.get("/:id", async (req, res) => {

    try{ 
        let id = parseInt(req.params.id);
        res.send(await carts.getCartsById(id))

    } catch(err) {
        res.status(500).json({ error: err.message })}
})

cartRouter.post("/:cid/products/:pid", async (req, res) => {

    try{ 
        let cartId = req.params.cid
        let productId = req.params.pid
        res.send(await carts.addProductCart(cartId, productId))

    } catch(err) {
        res.status(500).json({ error: err.message })}
})

// --- Export Cart Router
export default cartRouter