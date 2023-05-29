
import { Router } from "express";
import { addProperty, deleteProperty, getAllProperties, getLandlordProperties, getProperty, updateProperty } from "../controllers/propertyController";
import { verifyToken } from "../Middlewares/verifyToken";



const propertyRoutes= Router()

propertyRoutes.post('',verifyToken, addProperty)
propertyRoutes.get('',getAllProperties)
propertyRoutes.get('/:id',getProperty)
propertyRoutes.put('/:id',verifyToken, updateProperty)
propertyRoutes.delete("/:id", deleteProperty)
propertyRoutes.get('/my/property',verifyToken,getLandlordProperties)


export default propertyRoutes