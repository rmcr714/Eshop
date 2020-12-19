
import express, { json } from 'express'
import {notFound,errorHandler} from './middleware/errorMiddleware.js'
import dotenv from 'dotenv'
import colors from 'colors'
dotenv.config()
const app = express()
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

connectDB()         //Connecting to Db 

app.use(express.json())

app.get('/', (req,res)=>{
    res.send('Api is Running....')
} )

app.use('/api/products' , productRoutes)
app.use('/api/users' , userRoutes)
app.use('/api/orders' , orderRoutes)


app.use(notFound)

app.use(errorHandler)



const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
})