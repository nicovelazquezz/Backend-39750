const { Router } = require('express')
const { ProductManager } = require('../ProductManager/index')

const productManager = new ProductManager
const router = Router()

router.get('/', async (req, res) => {
    try {
        const products = await productManager.getProducts()
        const limit = req.query.limit

        limit ? res.status(200).send(products.slice(0, limit)) : res.status(200).send(products)  
        
    } catch (error) {
        res.status(400).send(console.log(error))
    }
});

router.get('/:id', async (req, res) => {
    try {
        const params = Number(req.params.id)
        const product = await productManager.getProductById(params)
        res.status(200).send(product)

    } catch (error) {
        res.status(400).send(console.log(error))
    }
}); 

module.exports = router;
