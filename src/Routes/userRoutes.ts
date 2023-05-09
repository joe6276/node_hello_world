import { Router } from "express";
import { addUser, deleteUser, getAllUsers, getUserByEmail, getUserById, updateUser } from "../controllers/userController";

const userRoutes= Router()


userRoutes.post('', addUser)
userRoutes.get('', getAllUsers)
userRoutes.get('/user/:id', getUserById)
userRoutes.get('', getUserByEmail)
userRoutes.put('/:id', updateUser)
userRoutes.delete('/:id',deleteUser)




export default userRoutes