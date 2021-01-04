import express from 'express'
const router = express.Router()
import{getProductById,getProducts,deleteProduct,createProduct,updateProduct,createProductReview,editProductReview} from '../controllers/productController.js'
import { protect,admin} from '../middleware/authMiddleware.js'




router.route('/').get(getProducts)  // or router.get('/',getProducts)

router.route('/').post(protect,admin,createProduct)

router.route('/:id').get(getProductById)  // or router.get('/:id',getProductById)

router.route('/:id').delete(protect,admin,deleteProduct)

router.route('/:id').put(protect,admin,updateProduct)

router.route('/:id/reviews').post(protect,createProductReview)

router.route('/:id/reviews').get(protect,editProductReview)



export default router