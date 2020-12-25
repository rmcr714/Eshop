import express from 'express'
const router = express.Router()
import { authUser,getUserProfile,registerUser ,updateUserProfile,getUsers,deleteUser} from '../controllers/userController.js'
import { protect,admin} from '../middleware/authMiddleware.js'


router.post('/login',authUser)

router.route('/profile').get(protect,getUserProfile) // or router.get('/profile',protect,getUserProfile)

router.route('/').post(registerUser)
router.route('/').get(protect,admin,getUsers)

router.route('/profile').put(protect,updateUserProfile)

router.route('/:id').delete(protect,admin,deleteUser)


export default router