

import{ Router} from 'express'
import { approveLandlord } from '../controllers/adminContoller'
import { verifyToken } from '../Middlewares/verifyToken'
const adminRoutes= Router()

adminRoutes.put('/:id',verifyToken, approveLandlord)

export default adminRoutes