const express = require('express')
const app = express()
const productosRouter = require('./routes/products.router')
const cartRouter = require('./routes/cart.router')

// // handlebars ____________________
// const handlebars = require('express-handlebars')

// app.engine('handlebars', handlebars.engine())
// app.set('views', __dirname+'/views')
// app.set('view engine', 'handlebars')
// // _____________________________________________


app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname+'/public'))


app.listen(8010, () => {
    console.log('Running on port 8010')})

app.use('/api/cart', cartRouter)
app.use('/api/products', productosRouter)


