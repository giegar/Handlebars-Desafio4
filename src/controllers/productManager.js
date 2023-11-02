import {promises as fs} from 'fs'

class productManager {
    
    constructor(path) {
        this.path = path,
        this.format = 'utf-8'

    }

// ----------- Metodos

    getProducts = async () => {
        try{
            let products = await fs.readFile(this.path, this.format);
            return JSON.parse(products);

        } catch(err){ return "Error getProducts"}
        
    };

    addID = async () => {
        try{
            const arrayProd = await this.getProducts();
            return arrayProd.length === 0 ? 1 : arrayProd[arrayProd.length - 1].id + 1;

        } catch(err){ return "Error addId Products"}   
    };

    addProducts = async (product) => {
        try{
            let oldProducts = await this.getProducts();
            product.id = await this.addID()
            let productsAll = [...oldProducts, product];
            await fs.writeFile(this.path, JSON.stringify(productsAll));
            return "Producto agregado";

        } catch(err){ return "Error addProducts"} 
    };

    getProductsById = async (id) => {
        try{
            let products = await this.getProducts();
            const productById = products.find(prod => prod.id === id)
    
            if(!productById) return "No se encontro el producto"
            
            return productById;

        } catch(err) { return "Error getProductsById"}
    };

    updateProduct = async (id, product) => {
        try{
            let products = await this.getProducts();
            const productById = products.find(prod => prod.id === id)

            if(!productById) return "No se encontro el producto"

            await this.deleteProducts(id);
            let old = await this.getProducts();
            let updated = [{...product, id : id}, ...old]

            await fs.writeFile(this.path, JSON.stringify(updated))
            
            return "Producto actualizado con exito";
        } catch(err){ return "Error updateProduct"}  
    };

    deleteProducts = async (id) => {
        try{
            let products = await this.getProducts();
            const productById = products.some(prod => prod.id === id)

            if (productById){
                let filterProducts = products.filter(prod => prod.id != id)
                await fs.writeFile(this.path, JSON.stringify(filterProducts))
                return "Producto eliminado"
            } else {
                return "El producto que desea eliminar no existe"}

        } catch(err){ return "Error deleteProducts"}
    };
}


const products = new productManager("./src/models/products.json")


export default productManager