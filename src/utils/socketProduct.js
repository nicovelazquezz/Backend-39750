const { ProductManager } = require("../DAOS/productManager")

const pm = new ProductManager

const socketProduct = async (io) => {
    let productos = await pm.getProducts()

    io.on('connection', socket => {
        console.log('Usuario conectado')

        socket.emit('productos', productos)

        socket.on('addProduct', data => {
            console.log(data)
            pm.addProduct(data)
        })
    })
}

module.exports = {
    socketProduct
}