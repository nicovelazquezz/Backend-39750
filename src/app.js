const express = require('express')
const app = express()
const productosRouter = require('./routers/products.router')
const cartRouter = require('./routers/cart.router')

// // handlebars ____________________
// const handlebars = require('express-handlebars')

// app.engine('handlebars', handlebars.engine())
// app.set('views', __dirname+'/views')
// app.set('view engine', 'handlebars')
// // _____________________________________________


app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname+'/public'))
app.use(express.json())


app.listen(8010, () => {
    console.log('Running on port 8010')})

app.use('/api/cart', cartRouter)
app.use('/api/products', productosRouter)


