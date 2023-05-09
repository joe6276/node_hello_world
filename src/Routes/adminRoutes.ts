

import{ Router} from 'express'
import { approveLandlord } from '../controllers/adminContoller'
const adminRoutes= Router()

adminRoutes.put('/:id', approveLandlord)

export default adminRoutes