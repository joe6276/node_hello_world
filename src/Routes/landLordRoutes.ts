import { Router } from "express";
import { addLandlord, deleteLandLord, getApproved, getLandLordByEmail, getLandLordById, getUnApproved, loginLandlord, updateLandlord } from "../controllers/landlordController";
const landlordRoutes= Router()


landlordRoutes.post('',addLandlord)
landlordRoutes.get('/approved', getApproved)
landlordRoutes.get('/unapproved', getUnApproved)
landlordRoutes.get('/get/:id', getLandLordById)
landlordRoutes.put('/:id', updateLandlord)
landlordRoutes.delete('/:id', deleteLandLord)
landlordRoutes.get('/get', getLandLordByEmail)
landlordRoutes.post('/login', loginLandlord)


export default landlordRoutes
