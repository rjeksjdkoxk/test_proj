const express = require('express')
const router = express.Router()
const productController = require('../controllers/products')

router.get('/', productController.getAllProducts)

router.get('/search', productController.searchProduct)

// router.get('/:id', productController.getProductById)

router.post('/multiple', productController.addManyProducts)

module.exports = router