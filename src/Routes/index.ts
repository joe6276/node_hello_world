import { Router } from "express";
import { addTodo, deleteTodo, getAllTodos, getOneTodo, updateTodo } from "../controllers/todoController";

const router = Router()

router.get('',getAllTodos)
router.post('',addTodo)
router.get('/:id',getOneTodo)
router.put('/:id',updateTodo)
router.delete('/:id',deleteTodo)

export default router