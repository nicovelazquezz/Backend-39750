const express = require('express')
const { Router } = require('express')
const { ProductManager } = require('../ProductManager/index')

const productManager = new ProductManager
const router = Router()

router.use(express.json())

// TRAER TOODS LOS PRODUCTOS Y FILTRADO DE LIMIT
router.get('/', async (req, res) => {
    try {
        const products = await productManager.getProducts()
        const limit = req.query.limit

        limit ? res.status(200).send(products.slice(0, limit)) : res.status(200).send(products)  
        
    } catch (error) {
        res.status(400).send(console.log(error))
    }
});

// TRAER LOS PRODUCTOS POR ID
router.get('/:id', async (req, res) => {
    try {
        const params = Number(req.params.id)
        const product = await productManager.getProductById(params)
        res.status(200).send(product)

    } catch (error) {
        res.status(404).send(console.log(error))
    }
}); 

// POST DE UN PRODUCTO
router.post('/', async (req, res) => {
    try {
        // Obtenemos el body
        const productSend = req.body
        
        // desestructuración para enviar al método addProduct
        const {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        } = productSend


        const agregado = await productManager.addProduct({title, description, price, thumbnail, code, stock})
        const products = await productManager.getProducts()
        res.status(200).send(products)
    }
    catch (err) {
        console.log(err);
    }

});

module.exports = router;
