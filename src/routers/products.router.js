const express = require('express')
const { Router } = require('express')
const { ProductManager } = require('../ProductManager/index')

const pm = new ProductManager
const router = Router()

router.use(express.json())

// TRAER TOODS LOS PRODUCTOS Y FILTRADO CON LIMIT
router.get('/', async (req, res) => {
    try {
        const products = await pm.getProducts()
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
        const product = await pm.getProductById(params)
        res.status(200).send(product)

    } catch (error) {
        res.status(404).send(console.log(error))
    }
}); 

// CREAR UN PRODUCTO
router.post('/', async (req, res) => {
    try {
        // Obtenemos el body
        const productSend = req.body

        // // Comprobar que todos los campos estén completos 
        // const emptyValue = Object.values(productSend).find(value => value === '')
        // if(emptyValue){return res.status(400).send('Todos los campos son obligatorios')} 
        
        // desestructuración para enviar al método addProduct
        let {
            title,
            description,
            price,
            thumbnail,
            category,
            status = true,
            code,
            stock
        } = productSend


        await pm.addProduct({title, description, price, thumbnail, category, status, code, stock})
        const products = await pm.getProducts()
        res.status(200).send(products)
    }
    catch (err) {
        res.status(400).send({ message: err + 'Error al agregar producto' })
    }
});

// BORRAR UN PRODUCTO
router.delete('/:id', async (req, res) => {
    try {
        const params = Number(req.params.id)
        const response = await pm.deleteProduct(params)   

        res.status(200).send(`El producto fue eliminado con exito`)

        if (!response.error) return res.status(400).send({ response })
        
    } catch (error) {
        console.log(error)
    }
})

// ACTUALIZAR UN PRODUCTO
router.put('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id)
        
        const productUpdate = req.body

        const updateProduct = await pm.updateProduct(id, productUpdate)        
        res.status(200).send(updateProduct)
    }
    catch (err) {
        console.log(err);
    }

});


module.exports = router;
