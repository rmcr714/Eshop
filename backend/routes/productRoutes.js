import express from 'express'
const router = express.Router()
import{getProductById,getProducts,deleteProduct} from '../controllers/productController.js'
import { protect,admin} from '../middleware/authMiddleware.js'




router.route('/').get(getProducts)  // or router.get('/',getProducts)



router.route('/:id').get(getProductById)  // or router.get('/:id',getProductById)

router.route('/:id').delete(protect,admin,deleteProduct)



export default router