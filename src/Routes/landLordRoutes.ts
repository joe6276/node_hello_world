import { Router } from "express";
import { addLandlord } from "../controllers/landlordController";
const landlordRoutes= Router()


landlordRoutes.post('',addLandlord)


export default landlordRoutes
