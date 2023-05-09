
import { Router } from "express";
import { addProperty, deleteProperty, getAllProperties, getProperty, updateProperty } from "../controllers/propertyController";


const propertyRoutes= Router()

propertyRoutes.post('',addProperty)
propertyRoutes.get('',getAllProperties)
propertyRoutes.get('/:id',getProperty)
propertyRoutes.put('/:id', updateProperty)
propertyRoutes.delete("/:id", deleteProperty)


export default propertyRoutes