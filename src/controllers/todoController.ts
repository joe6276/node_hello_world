import { Request,Response } from "express"
interface Todo{
    id:number
    title:string
    description:string
}

let todos:Todo[]=[]

export const getAllTodos =(req:Request, res:Response)=>{
    res.status(200).json(todos)
}

export const addTodo=(req:Request, res:Response)=>{
    const {title, description}=req.body as Todo
    todos.push({id:Math.floor(Math.random()*10000), title,description})
    return res.status(201).json({message:"Todo added successfully..."})
}

export const getOneTodo=(req:Request<{id:string}>, res:Response)=>{
    const {id}= req.params
    
    const todo= todos.find(t=>{
        return t.id ===parseInt(id)
    })
    if(todo){
        return res.status(200).json(todo)
    }else{
        return res.status(404).json({message:"Todo not Found"})
    }
}

export const updateTodo=(req:Request<{id:string}>, res:Response)=>{
    const {id}= req.params
    const {title,description}=req.body as Todo
    const index= todos.findIndex(t=>{
        return t.id ===parseInt(id)
    })
    if(index>=0){
        todos[index]= {id:parseInt(id),title,description}
        return res.status(204).json({message:"Todo Updated"})
    }
    return res.status(404).json({message:"Todo not Found"})
}


export const deleteTodo=(req:Request<{id:string}>, res:Response)=>{
    const {id}= req.params
    const index= todos.findIndex(t=>{
        return t.id ===parseInt(id)
    })

    if(index>=0){
        todos.splice(index,1)
        return res.status(204).json({message:"Todo Deleted"})
    }
   
    return res.status(404).json({message:"Todo not Found"})

}