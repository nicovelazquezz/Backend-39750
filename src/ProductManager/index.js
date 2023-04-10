const { mock } = require('../../mock')
const { promises } = require('fs')
const fs = promises

class ProductManager {
    constructor(products = []) {
        this.products = products
        this.path = `./data.json`
    }

    getProducts = async () => {
        try {
            const resp = await fs.readFile(this.path, 'utf-8')
            const productos = JSON.parse(resp)
            return productos
        } catch (error) {
            console.log(error)
        }
    }

    appendProduct = async () => {
        try {
            const productJSON = JSON.stringify(this.products, null, 2)
            console.log('Escribiendo en el archivo', this.path);
            await fs.writeFile(this.path, productJSON)
        } catch (error) {
            console.log(error)
        }
    }

    addProduct = async ({ title, description, price, thumbnail, code, stock }) => {
        const productsFS = await this.getProducts();
        if (productsFS === undefined) {
            this.products = []
        } else {
            this.products = productsFS
        }
        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };

        const existingProduct = this.getProductByCode(code);
        if (existingProduct) {
            console.error(`Ya existe un producto con el código ${code}`);
            return;
        }

        // ID Autoincremental
        if (this.products.length === 0) {
            product.id = 1
        } else {
            product.id = this.products[this.products.length - 1].id + 1
        }

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error("Todos los campos son obligatorios");
            return;
        }


        this.products.push(product);
        // console.log("Producto agregado:", product);
        // Llamar a la función appendProduct para escribir en el archivo
        this.appendProduct()
    }

    getProductById = async (id) => {
        try {
            const productos = await this.getProducts()
            const product = productos.find((p) => p.id === id);
            return product
        } catch (error) {
            console.log(error)
        }
    }


    deleteProduct = async (id) => {
        try {
            const productos = await this.getProducts()

            const productToDelete = productos.find((p) => p.id === id);
            if (!productToDelete) {
                console.error("No se encontró el producto con el id ingresado");
                return;
            }

            const productIndex = productos.findIndex((p) => p.id === id);
            productos.splice(productIndex, 1);

            await fs.writeFile(this.path, JSON.stringify(productos, null, 2), 'utf-8')
            console.log("Producto eliminado:", productToDelete);
        } catch (error) {
            console.log(error)
        }
    }


    getProductByCode = (code) => {
        const existingProduct = this.products.find((p) => p.code === code);
        return existingProduct;
    }

    updateProduct = async (id, obj) => {
        try {
            const productos = await this.getProducts()

            const productToUpdate = productos.find(p => p.id === id);
            if (!productToUpdate) {
                console.error("No se encontró el producto con el id ingresado");
                return;
            }

            Object.assign(productToUpdate, obj);

            await fs.writeFile(this.path, JSON.stringify(productos, null, 2), 'utf-8')
            console.log("Producto actualizado:", productToUpdate);
        } catch (error) {
            console.log(error)
        }
    }
}

const nuevoProducto = new ProductManager();


// mock.forEach(product => {
//     nuevoProducto.addProduct(product)
// });

// nuevoProducto.getProducts()

// nuevoProducto.getProductById(7)

// nuevoProducto.deleteProduct(2)

// nuevoProducto.updateProduct(1, {
//     title: 'Bicicleta de Ruta'
// })



module.exports = { ProductManager };

