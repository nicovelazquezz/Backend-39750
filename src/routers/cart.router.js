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

        const data = req.body
        const cid = req.params.cid

        const respuesta = await cartManager.updateCart(cid, data)
        res.send('oks')


    } catch (error) {
        console.log(error)
    }
})

module.exports = router