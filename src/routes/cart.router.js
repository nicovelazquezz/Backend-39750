const { Router } = require('express')
const { ProductManager } = require('../ProductManager/index')

const productManager = new ProductManager
const router = Router()


router.get('/', async (req, res) => {
    try {
        res.status(200).res.send('holaaaaa')        
    } catch (error) {
        res.status(400).send(console.log(error))
    }
});

module.exports = router