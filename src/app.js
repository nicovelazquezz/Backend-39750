const express = require('express')
const app = express()
const productosRouter = require('./routers/products.router')
const cartRouter = require('./routers/cart.router')
const realtimeProd = require('./routers/realtimeprod.router')
const handlebars = require('express-handlebars')
const { Server } = require('socket.io')
const { socketProduct } = require('./utils/socketProduct')

// handlebars ____________________
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')
// _____________________________________________


const PORT = 8010
const httpServer = app.listen(PORT, () => { console.log(`Running on port ${PORT}`) })

const io = new Server(httpServer)

socketProduct(io)

app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static(__dirname+'/public'))
app.use(express.json())

app.get('/chat', (req, res) => {
    res.render('chat', {
        style: 'index.css'
    })
})


app.get('/home', ( req, res)=>{
    res.render('home', {
    })
})


io.on('connection', socket => {
    console.log('Nuevo cliente conectado')

    socket.on('message', data => {
        console.log(data)
    })

    // mensaje individual para quién se haya conectado 
    socket.emit('message', 'Este es un mensaje enviado desde el servidor')

    // evento para todos menos para el socket actual. osea cuando otro usuario se conecta no recibe el msg pero vos si
    socket.broadcast.emit('message-broadcast', 'Este es un mensaje que has recibido porque otro usuario se conecto')

    // evento global. lo reciben al que se conecta y a todos 
    io.emit('message-global', 'Mensaje global desde IO y no socket')
})

app.use('/realtimeproducts', realtimeProd )
app.use('/api/cart', cartRouter)
app.use('/api/products', productosRouter)


