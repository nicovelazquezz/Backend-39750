const { promises } = require('fs')
const fs = promises

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
            const product = productos.find((p) => p.id === id);
            console.log(product)
        } catch(error){
            console.log(error)
        }
    }

    getProductByCode(code) {
        return this.products.find((p) => p.code === code);
    }

    // deleteProduct()

    // updateProduct()


            // await fs.writeFile('./data.txt', 'productos', 'utf-8')

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
nuevoProducto.getProductById(7)



// const productos = nuevoProducto.getProducts()

// const operacionesAsync = async () => {    
//     try {
//          await fs.writeFile('./data.txt', 'productos', 'utf-8')

//          await fs.appendFile('./data.txt', 'hola que tal\n', 'utf-8')

//          let contenido = await fs.readFile('./data.txt', 'utf-8')
//          console.log(contenido)

//          let archivoJSON = await fs.readFile('./package.json', 'utf-8')
//          const archivoParseado = (JSON.parse(archivoJSON))


//          await fs.appendFile('./data.txt', archivoParseado, 'utf-8')






//     } catch (error) {
//         console.log(error)
//     }    

// }


// operacionesAsync()





// class celulares {
//     constructor(color, peso, rdp, rdc, ram){
//         this.color = color,
//         this.peso = peso,
//         this.resolucionDePantalla = rdp,
//         this.resoluciondeCarama = rdc,
//         this.memoriaRam = ram
//     }

//     prender(){
//         console.log('prendiendo')
//     }
//     apagar(){
//         console.log('apagando')
//     }
//     tomarFoto(){
//         console.log('sacando foto')
//     }
//     grabar(){
//         console.log('grabando')
//     }

// }

// const newCelular = new celulares("rojo", 250, 32, 24, "2gb")
// console.log(newCelular)
// newCelular.grabar()