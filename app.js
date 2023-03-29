const { ProductManager } = require('./index')
const express = require('express')
const app = express()

const productManager = new ProductManager

app.use(express.urlencoded({ extended: true }));

app.listen(8010, () => {
    console.log('Running on port 8010')})

app.get('/productos', async (req, res) => {
    try {
        const products = await productManager.getProducts()
        const limit = req.query.limit

        limit ? res.send(products.slice(0, limit)) : res.send( products )  
    } catch (error) {
        console.log(error)
    }
});

app.get('/producto/:id', async (req, res) => {
    try {
        const params = Number(req.params.id)
        const product = await productManager.getProductById(params)
        res.send(product)

    } catch (error) {
        console.log(error)
    }
}); 