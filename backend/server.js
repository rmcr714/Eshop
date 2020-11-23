const express = require('express')
const app = express()
const products = require('./data/products')


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



app.listen(5000, ()=>{
    console.log("Listeining on port 5000")
})