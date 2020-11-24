import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
const app = express()

import products from './data/products.js'


app.get('/', (req,res)=>{
    res.send('Api is Running....')
} )


app.get('/api/products', (req,res)=>{
    res.json(products)
} )

app.get('/api/products/:id', async (req,res)=>{
    const product = await products.find(p=>p._id == req.params.id);
    
    res.json(product)
} )


const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
})