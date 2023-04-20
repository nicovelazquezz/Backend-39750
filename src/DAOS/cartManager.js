const { promises } = require('fs')
const fs = promises

class CartManager {
    constructor() {
        this.cart = []
        this.path = './src/DAOS/cart.json'
    }

    addCart = async (newCart) => {
        try {
            const cart = await this.getCart();
            this.cart = cart


            //ID autoincremental
            if (this.cart.length === 0) {
                newCart.id = 1
            } else {
                const productMatch = cart.find(e => e.id === newCart.id)
                if(productMatch) {
                    console.log(productMatch)
                } else {
                    newCart.id = this.cart[this.cart.length - 1].id + 1
                }
            }

            // if (Object.values(newCart).every(value => value)) {
            //     this.cart.push(newCart);
            //     const toJSON = JSON.stringify(this.cart, null, 2);
            //     await fs.writeFile(this.path, toJSON)
            // }


           console.log(newCart)


        } catch (error) {
            console.log(error)
        }
    }

    getCart = async () => {
        try {
            const getFileCart = await fs.readFile(this.path, 'utf-8');
            if (getFileCart.length === 0) return [];
            return JSON.parse(getFileCart);
        } catch (err) {
            if (err.code === 'ENOENT') {
                await fs.writeFile(this.path, '[]');
                return [];
            }
            console.log(err);
            return { status: "error", error: err };
        }
    };

    getCartProductByID = async (id) => {
        try {
            const carrito = await this.getCart()
            if (!carrito[id - 1]) return { error: 'Error! El carrito No existe' }

            return carrito[id - 1]
        } catch (error) {
            console.log(error)
        }
    }

    updateCart = async (cid, data) => {
        try {
            const carrito = await this.getCartProductByID(cid)
            if (isNaN(Number(cid))) return { status: "error", message: 'No es un id válido' };

            carrito.products?.forEach(element => {
                if (element.id === data.id) {
                    element.cantidad += data.cantidad
                }
            })

            await this.addCart(carrito)



            // const toJSON = JSON.stringify(this.cart, null, 2);
            // await fs.writeFile(this.path, toJSON)
            // return this.cart
        }
        catch (err) {
            console.log(err);
        }

    }
}




module.exports = { CartManager }