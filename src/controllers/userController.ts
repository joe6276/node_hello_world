import { Request, RequestHandler, Response } from "express";
import mssql from 'mssql'
import { sqlConfig } from "../config";
import {v4 as uid} from 'uuid'
import bcrypt from 'bcrypt'
import { log } from "console";
interface ExtendedRequest extends Request{
 body:{
    name:string
    email:String
    password:string
 }
 params:{
    id:string
 }
}

interface User{
    id:string
    name:string
    email:string
    roles:string
    isDeleted:number
    password:string
    emailSent:string
}

export const addUser=async (req:ExtendedRequest, res:Response)=>{
    //logic to add a user to the database
    try {
        let id = uid() //a unique id

        const {name,email,password} =req.body
        let hashedPassword= await bcrypt.hash(password,10) //hash a password
        //connect to the database
        const pool =  await mssql.connect(sqlConfig)
        // make a request
        await pool.request()
        .input('id', mssql.VarChar ,id)
        .input('name', mssql.VarChar ,name)
        .input('email', mssql.VarChar ,email)
        .input('password', mssql.VarChar ,hashedPassword)
        .execute('insertUser')
        return res.status(201).json({message:"user registered!!"})
        
    } catch (error:any) {
        //server side error
        return res.status(500).json(error.message)
    }
}


///get all Users


export const getAllUsers:RequestHandler=async(req,res)=>{
    
    try {
        const pool =  await mssql.connect(sqlConfig)
        let users:User[] =(await (await pool.request()).execute('getUsers')).recordset
        res.status(200).json(users)
    } catch (error:any) {
         //server side error
         return res.status(500).json(error.message)
    }
}

///get User By Email

export const getUserByEmail:RequestHandler=async(req,res)=>{
    try {
        const {email}=req.query

        const pool =  await mssql.connect(sqlConfig)

        let user:User =(await (await pool.request())
        .input('email', email)
        .execute('getUserByEmail')).recordset[0]

        if(user){
            return res.status(200).json(user)
        }
        return res.status(404).json({message:"User Not Found"})
    } catch (error:any) {
         //server side error
         return res.status(500).json(error.message)
    }
}



///get User By ID

export const getUserById:RequestHandler<{id:String}>=async(req,res)=>{
    try {
        const {id}=req.params
        const pool =  await mssql.connect(sqlConfig)

        let user:User =(await (await pool.request())
        .input('id', id)
        .execute('getUserById')).recordset[0]

        if(user){
            return res.status(200).json(user)
        }
        return res.status(404).json({message:"User Not Found"})
    } catch (error:any) {
         //server side error
         return res.status(500).json(error.message)
    }
}


//update User

export const updateUser = async(req:ExtendedRequest, res:Response)=>{
    try {
        // Read from the body and hash
        const {name,email,password} =req.body
        let hashedPassword= await bcrypt.hash(password,10)
        //read params
        const {id}=req.params
        //create a connection and make request
        const pool =  await mssql.connect(sqlConfig)
        let user:User =(await (await pool.request())
        .input('id', id)
        .execute('getUserById')).recordset[0]

        if(!user){ //no user found
            return res.status(404).json({message:"User Not Found"})
        }
        //continue with the update process
        await pool.request()
        .input("id",id)
        .input("name",name)
        .input("email",email)
        .input("password",hashedPassword)
        .execute('updateUSer')
        return res.status(200).json({message:"User Updated"})
    } catch (error:any) {
        //server side error
        return res.status(500).json(error.message) 
    }
}

//Delete Users 

export const deleteUser=async(req:Request<{id:string}>, res:Response)=>{
    try {
        
           //read params
           const {id}=req.params
           //create a connection and make request
           const pool =  await mssql.connect(sqlConfig)
           let user:User =(await (await pool.request())
           .input('id', id)
           .execute('getUserById')).recordset[0]
   
           if(!user){ //no user found
               return res.status(404).json({message:"User Not Found"})
           }
           await pool.request()
           .input('id', id)
           .execute('deleteUser')
           return res.status(200).json({message:"User Deleted"})
    } catch (error:any) {
        //server side error
        return res.status(500).json(error.message)  
    }
}