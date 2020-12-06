import express from 'express'
const router = express.Router()
import{getProductById,getProducts} from '../controllers/productController.js'




router.route('/').get(getProducts)  // or router.get('/',getProducts)



router.route('/:id').get(getProductById)  // or router.get('/:id',getProductById)



export default router