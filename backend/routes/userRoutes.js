import express from 'express'
const router = express.Router()
import { authUser,getUserProfile,registerUser ,updateUserProfile} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'


router.post('/login',authUser)

router.route('/profile').get(protect,getUserProfile) // or router.get('/profile',protect,getUserProfile)

router.route('/').post(registerUser)

router.route('/profile').put(protect,updateUserProfile)


export default router