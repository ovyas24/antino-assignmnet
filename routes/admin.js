const express = require('express')
const Helper = require('../helper/helper')
const router = express.Router()

router.post('/products',async (req,res)=>{
    try {
        const isProductAdded = await Helper.addProduct(req.body)       
        res.json(isProductAdded)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.put('/product/:id', async (req,res)=>{
    try {
        const isProductUpdated = await Helper.updateProduct(req.params.id, req.body)
        res.json(isProductUpdated)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

router.delete('/product/:id', async (req,res)=>{
    try {
        const isProductDelted = await Helper.deleteProduct(req.params.id)
        res.json(isProductUpdated)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router