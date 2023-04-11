const { mock } = require('../../mock')
const { promises } = require('fs')
const fs = promises

class ProductManager {
    constructor(products = []) {
        this.products = products
        this.path = `./src/DAOS/data.json`
    }

    getProducts = async () => {
        try {
            const resp = await fs.readFile(this.path, 'utf-8')
            if (resp.length === 0){ return []}
                else {
                    const productos = JSON.parse(resp)
                    return productos
                }            
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

    addProduct = async ({ title, description, price, thumbnail, category, status, code, stock }) => {
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
            category,
            status,
            code,
            stock,
        };

        (product.status === false) ? product.status = false : product.status = true;


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

        if (!title || !description || !price || !category  || !code || !stock) {
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
                return
            }

            const productIndex = productos.findIndex((p) => p.id === id);
            productos.splice(productIndex, 1);

            await fs.writeFile(this.path, JSON.stringify(productos, null, 2), 'utf-8')
            console.log("Producto eliminado:", productToDelete);
            return true;
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

            if(isNaN(id)){return{message: 'No es un id válido'}}

            const productToUpdate = productos.find(p => p.id === id);
            if (!productToUpdate) {
                console.error("No se encontró el producto con el id ingresado");
                return;
            }

            Object.assign(productToUpdate, obj);

            await fs.writeFile(this.path, JSON.stringify(productos, null, 2), 'utf-8')
            console.log("Producto actualizado:", productToUpdate);
            return productToUpdate
        } catch (error) {
            console.log(error)
        }
    }
}

const nuevoProducto = new ProductManager();

// const test =  async () => { await mock.forEach(product => { nuevoProducto.addProduct(product)})};
// test()

// nuevoProducto.getProducts()

// nuevoProducto.addProduct({
//     title: 'Auto familiar',
//     description: 'Auto familiar con amplio espacio interior',
//     price: 30000,
//     thumbnail: 'auto.jpg',
//     category: 'vehiculo',
//     code: 'AUTO004',
//     stock: 6
// })
// nuevoProducto.addProduct(
//     {
//         title: 'Camioneta deportiva',
//         description: 'Camioneta deportiva de alta potencia',
//         price: 40000,
//         thumbnail: 'camioneta.jpg',
//         category: 'vehiculo',
//         code: 'CAMIONETA003',
//         stock: 3
//     })

// nuevoProducto.addProduct({
//     title: 'Bicicleta plegable',
//     description: 'Bicicleta plegable para transporte urbano',
//     price: 800,
//     thumbnail: 'bicicleta.jpg',
//     category: 'vehiculo',
//     code: 'BIKE004',
//     stock: 12
// })
// nuevoProducto.addProduct(   {
//     title: 'Moto custom',
//     description: 'Moto custom con estilo clásico',
//     price: 12000,
//     thumbnail: 'moto.jpg',
//     category: 'vehiculo',
//     code: 'MOTO003',
//     stock: 4
// })



// nuevoProducto.getProductById(7)

// nuevoProducto.deleteProduct(2)

// nuevoProducto.updateProduct(1, {
//     title: 'Bicicleta de Ruta'
// })



module.exports = { ProductManager };

