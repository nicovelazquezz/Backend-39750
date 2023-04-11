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
                newCart.id = this.cart[this.cart.length - 1].id + 1
            }

            if (Object.values(newCart).every(value => value)) {
                this.cart.push(newCart);
                const toJSON = JSON.stringify(this.cart, null, 2);
                await fs.writeFile(this.path, toJSON)
            }

            return [];


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
            const carrito = this.getCart()
            const parseCarts = JSON.parse(carrito);
            console.log(parseCarts[id - 1]);
            if (!parseCarts[id - 1]) return { error: 'Error! El carrito No existe' }

            return parseCarts[id - 1]
        } catch (error) {
            console.log(error)
        }
    }

    updateCart = async () => {
        try {
            
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = { CartManager }