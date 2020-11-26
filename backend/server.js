
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
dotenv.config()
const app = express()

import products from './data/products.js'
import connectDB from './config/db.js'

connectDB()         //Connecting to Db 


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