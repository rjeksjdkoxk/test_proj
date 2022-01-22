const Product = require('../models/product')

const addManyProducts = async (req, res, next) => {
    await Product.insertMany(
        req.body.products
    )
        .catch(reason => {
            res.send(reason.message)
        })

    res.send('many products inserted')
}

const getAllProducts = async (req, res, next) => {
    const products = await Product.find()
        .catch(reason => {
            res.send(reason.message)
        })

    res.json(
        {
            success: true,
            products
        }
    )
}

const searchProduct = async (req, res, next) => {
    const products = await Product.find(
        {
            ...req.query
        }
    )
        .catch(reason => {
            res.send(reason.message)
        })

    res.json(
        {
            success: true,
            products
        }
    )

}

module.exports = {
    addManyProducts,
    getAllProducts,
    searchProduct
}