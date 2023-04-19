const { ProductManager } = require("../DAOS/productManager")

const pm = new ProductManager

const socketProduct = async (io) => {
    let productos = await pm.getProducts()
    io.on('connection', socket => {
        console.log('Usuario conectado')
        socket.emit('productos', productos)
    })
}

module.exports = {
    socketProduct
}