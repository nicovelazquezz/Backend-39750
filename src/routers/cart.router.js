const { Router } = require('express')
const router = Router()
const { CartManager } = require('../DAOS/cartManager')

const cartManager = new CartManager

// TRAER TODOS LOS PRODUCTOS DEL CARRITO
router.get('/', async (req, res) => {
    try {
        const cart = await cartManager.getCart()
        res.status(200).send(cart)
    } catch (error) {
        res.status(400).send(console.log(error))
    }
});

// TRAER UN PRODUCTO POR ID
router.get('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id)
        const carrito = await cartManager.getCartProductByID(id)
        await (carrito === undefined) ? res.status(404).send(`No se encontró un producto con el id #${id}`) : res.status(200).send(carrito)

    } catch (error) {
        res.status(400).send(console.log(error))
    }
});

// AGREGAR PRODUCTO AL CARRITO
router.post('/', async (req, res) => {
    try {
        const newCart = req.body

        await cartManager.addCart(newCart)
        res.status(200).send('agregado')
    } catch (error) {
        res.status(400).send(console.log(error))
    }
});

// ACTUALIZAR EL CARRITO
router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const newCart = req.body
        const idBody = Number(newCart.id)
        const cantidadBody = Number(newCart.cantidad)

        const cid = Number(req.params.cid)
        const pid = Number(req.params.pid)

        const carrito = await cartManager.getCart()
        const carritoById = await cartManager.getCartProductByID(cid)


        // Obtengo el array y busco un producto que coincida con el id de la url para actualizar su cantidad
        // el arrayfiltrado devuelve un objeto el cuál coincide su id con el id de parametro    
        const arrayAFiltrar = carritoById.productos
        const productoAActualizar = arrayAFiltrar.find(p => p.id == pid)
        if (productoAActualizar === undefined) {
            res.status(404).send({ 'Error': 'No se ha encontrado el producto' })
        }

        

        if (Object.keys(productoAActualizar).includes("id") && productoAActualizar.id === idBody) {
            console.log("El objeto contiene el id proporcionado");
            const cantidadActualizada = productoAActualizar.cantidad + cantidadBody
            res.send({ cantidadActualizada })
        } else {
            console.log("El objeto no contiene el id proporcionado");
        }


    } catch (error) {
        console.log(error)
    }
})

module.exports = router