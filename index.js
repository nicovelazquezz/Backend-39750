const { promises : fs} = require('fs')

class ProductManager {
    constructor(products = []) {
        this.products = products
        this.lastId = 0
        this.path = './data.json'
    }   

    appendProduct = async () => {
        try {
            const productJSON = JSON.stringify(this.products, null, 2)
            console.log('Escribiendo en el archivo', this.path);
            await fs.writeFile(this.path, productJSON, 'utf-8')
        } catch(error) {
            console.log(error)
        }
    }

    addProduct({ title, description, price, thumbnail, code, stock }) {
        const product = {
            id: ++this.lastId,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };
        
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error("Todos los campos son obligatorios");
            return;
        }

        if (this.getProductByCode(code)) {
            console.error("Ya existe un producto con el código ingresado");
            return;
        }


        this.products.push(product);
        // console.log("Producto agregado:", product);
        // Llamar a la función appendProduct para escribir en el archivo
        this.appendProduct()
    }

    getProducts = async () => {
        try {
            const resp = await fs.readFile(this.path, 'utf-8')
            const productos = JSON.parse(resp)
            console.log(productos)
        } catch(error){
            console.log(error)
        }
    }

    getProductById = async (id) => {
        try {
            const resp = await fs.readFile(this.path, 'utf-8')
            const productos = JSON.parse(resp)
            const product = productos.find(p => p.id === id);
            console.log(product)
            return product
        } catch(error){
            console.log(error)
        }
    }

    getProductByCode = async (code) => {
        try {
            const resp = await fs.readFile(this.path, 'utf-8')
            const productos = JSON.parse(resp)
            const productoFiltrado = productos.find((p) => p.code === code);

            return productoFiltrado ? productoFiltrado : null       
        } 
        catch (error){
            console.log(error)
        }
    }

    deleteProduct = async (id) => {
        try {
            const resp = await fs.readFile(this.path, 'utf-8')
            const productos = JSON.parse(resp)
    
            const productToDelete = productos.find((p) => p.id === id);
            if (!productToDelete) {
                console.error("No se encontró el producto con el id ingresado");
                return;
            }
    
            const productIndex = productos.findIndex((p) => p.id === id);
            productos.splice(productIndex, 1);
    
            await fs.writeFile(this.path, JSON.stringify(productos, null, 2), 'utf-8')
            console.log("Producto eliminado:", productToDelete);
        } catch(error) {
            console.log(error)
        }
    }
    

    updateProduct = async (id, obj) => {
        try {
            const resp = await fs.readFile(this.path, 'utf-8')
            const productos = JSON.parse(resp)
    
            const productToUpdate = productos.find(p => p.id === id);
            if (!productToUpdate) {
                console.error("No se encontró el producto con el id ingresado");
                return;
            }
    
            Object.assign(productToUpdate, obj);
    
            await fs.writeFile(this.path, JSON.stringify(productos, null, 2), 'utf-8')
            console.log("Producto actualizado:", productToUpdate);
        } catch(error) {
            console.log(error)
        }
    }
    

}

const nuevoProducto = new ProductManager();
const newProduct = {
    title: 'Bicicleta de montaña',
    description: 'Una bicicleta de montaña de alta calidad',
    price: 100,
    thumbnail: 'bicicleta.jpg',
    code: 'BIKE001',
    stock: 10
};

const newProduct2 = {
    title: 'Moto',
    description: 'Moto R1000',
    price: 1500,
    thumbnail: 'moto.jpg',
    code: 'BIKE002',
    stock: 5
};

const newProduct3 = {
    title: 'Auto',
    description: 'Auto BMW M3',
    price: 4000,
    thumbnail: 'car.jpg',
    code: 'CAR001',
    stock: 3
};

const newProduct4 = {
    title: 'Camion',
    description: 'Camión Scania',
    price: 5500,
    thumbnail: 'camion.jpg',
    code: 'TRUCK001',
    stock: 5
};

nuevoProducto.addProduct(newProduct)
nuevoProducto.addProduct(newProduct2)
nuevoProducto.addProduct(newProduct3)
nuevoProducto.addProduct(newProduct4)

// nuevoProducto.getProducts()
// nuevoProducto.getProductById(2)

// nuevoProducto.updateProduct(2, {
//     title: 'Motito',
//     price: 2330
// })

// nuevoProducto.deleteProduct(2)