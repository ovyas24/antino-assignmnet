const express = require('express')
const Helper = require('../helper/helper')
const router = express.Router()

router.get('/products',async (req,res)=>{
    try {
        const allProducts =  await Helper.getAllProduct()
        res.json(allProducts)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/product/:id', async (req,res)=>{
    try {
        const product = await Helper.getSingleProduct(req.params.id)
        res.json(product)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router