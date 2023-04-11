const express = require('express')
const app = express()
const productosRouter = require('./routers/products.router')
const cartRouter = require('./routers/cart.router')
const { Server } = require('socket.io')

// // handlebars ____________________
// const handlebars = require('express-handlebars')

// app.engine('handlebars', handlebars.engine())
// app.set('views', __dirname+'/views')
// app.set('view engine', 'handlebars')
// // _____________________________________________

const PORT = 8010
const httpServer = app.listen(PORT, () => { console.log(`Running on port ${PORT}`) })

const socketServer = new Server(httpServer)

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname+'/public'))
app.use(express.json())

app.use('/api/cart', cartRouter)
app.use('/api/products', productosRouter)


