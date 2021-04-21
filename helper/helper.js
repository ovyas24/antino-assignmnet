const Product = require("../model/product");

class Helper {
    constructor() { }

    async getAllProduct() {
        try {
            const products = await Product.find({})
            return products
        } catch (error) {
            return error
        }
    }

    async getSingleProduct(id) {
        try {
            const product = await Product.findOne({ _id: id })
            return product
        } catch (error) {
            return error
        }
    }

    async addProduct({ name, price }) {
        try {
            const newProduct = new Product({
                name, price
            })

            const isAdded = await newProduct.save()

            return isAdded ? `Product ${isAdded.name} is added to database with id : ${isAdded._id}` : `Product ${isAdded.name} is not added to database`
        } catch (error) {
            return error
        }
    }

    async updateProduct(id, { name, price } = {}) {
        try {
            const product = await this.getSingleProduct(id)
            let updates = {}
            updates.name = name ? name : product.name
            updates.price = price ? price : product.price

            console.log(updates);

            const isUpdated = await Product.updateOne({ _id: id }, updates)

            return isUpdated
        } catch (error) {
            return isUpdated
        }
    }

    async deleteProduct(id) {
        try {
            const isDeleted = await Product.deleteOne({ _id:id })
            return isDeleted
        } catch (error) {
            return error
        }
    }
}

module.exports = new Helper