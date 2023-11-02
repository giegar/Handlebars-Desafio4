import {promises as fs} from 'fs'
import productManager from './productManager.js';


class cartManager {
    
    constructor(path) {
        this.path = path,
        this.format = 'utf-8'
    };
    

    getCarts = async () => {
        try{
            let carts = await fs.readFile(this.path, this.format);
            return JSON.parse(carts);

        } catch(err){ return "Error getCarts"}
        
    };

    addID = async () => {
        try{
            const arrayCarts = await this.getCarts();
            return arrayCarts.length === 0 ? 1 : arrayCarts[arrayCarts.length - 1].id + 1;

        } catch(err){ return "Error addID"}
        
    };

    writeCarts = async (carts) => {
        try{
            await fs.writeFile(this.path, JSON.stringify(carts))
            
        } catch(err){ return "Error writeCarts"}
        
    };

    addCarts = async () => {
        try{
            let oldCarts = await this.getCarts();
            let id = await this.addID()
            let cartsAll = [{id :id, products : []}, ...oldCarts];

            await this.writeCarts(cartsAll);
            return "Nuevo carrito agregado";

        } catch(err){ return "Error addCarts"}
        
    };

    getCartsById = async (id) => {
        try{
            let carts = await this.getCarts();
            const cartById = carts.find(c => c.id === id)
    
            if(!cartById) return "No se encontro el carrito"
            
            return cartById;

        } catch(err){ return "Error getCartsById"}

    };

    addProductCart = async (cartId, productId) => {
        try{
            let cartById = await this.getCartsById(cartId);
            if (!cartById) return "Carrito no encontrado"

            let productById = await productsAll.getProductsById(productId);
            if (!productById) return "Producto no encontrado"

            let cartsAll = await this.getCarts()
            let cartFilter = cartsAll.filter(c => c.id != cartId)

            /*let exists = cartById.products.some((prod) => prod.id === productId)
            console.log(exists)

            if (exists) {
                let productInCart = cartById.products.find(prod => prod.id === productId)
                productInCart.quantity++

                let concat = [cartById, ...cartFilter]
                await this.writeCarts(concat)
                return "Producto sumado al carrito"
            } */

            let cartsConcat = [{id: cartById.id, products: [{id: productById.id, quantity: 1}]}, ...cartFilter]
            await this.writeCarts(cartsConcat)
            return "Producto agregado al carrito"

        } catch(err){ return "Error addProductCart"}    
        
    };
}
const productsAll = new productManager("./src/models/products.json")
const carts = new cartManager("./src/models/carts.json")

//carts.addProductCart(2, 5)


// --- Export Cart Manager
export default cartManager;