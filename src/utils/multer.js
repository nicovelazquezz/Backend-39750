const multer = require('multer')

// Aquí vamos a configurar el destino y el nombre del archivo. Dos propiedades, destination y filename. Ambas funciones. La cb es la función para darle el path de los archivos.
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, `${__dirname}/public/uploads`)
    } ,
    filename: function(req, file, cb){
        cb(null,`${Date.now()} - ${file.originalname}`)
    }
})

const uploader =  multer({
    storage,
    onError: function(error, next){
        console.log(error)
        next
    }
})

module.exports = { uploader }