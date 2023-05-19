
import { Request, RequestHandler, Response } from "express";
import {v4 as uid} from 'uuid'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import path from 'path'
import { DatabaseHelper } from "../DatabaseHelper";
import { User, UserExtendedRequest } from "../Interfaces";
dotenv.config({path:path.resolve(__dirname, '../../.env')})



export const addUser=async (req:UserExtendedRequest, res:Response)=>{
    //logic to add a user to the database
    try {
        let id = uid() //a unique id

        const {name,email,password} =req.body
        let hashedPassword= await bcrypt.hash(password,10) //hash a password
        //send request to database
       await DatabaseHelper.exec('insertUser',{id,name,email,password:hashedPassword})
        return res.status(201).json({message:"user registered!!"})
        
    } catch (error:any) {
        //server side error
        return res.status(500).json(error.message)
    }
}


///get all Users


export const getAllUsers:RequestHandler=async(req,res)=>{
    try {
        let users:User[] = await (await DatabaseHelper.exec('getUsers')).recordset
        res.status(200).json(users)
    } catch (error:any) {
         //server side error
         return res.status(500).json(error.message)
    }
}

///get User By Email

export const getUserByEmail:RequestHandler=async(req,res)=>{
    try {
        const {email}=req.query as {email:string}
        console.log(req.query)
        let user= await (await DatabaseHelper.query(`SELECT * FROM Users WHERE email=${email}`)).recordset[0]
        // let user:User = await (await DatabaseHelper.exec('getUserByEmail', {email})).recordset[0]
        if(user){
            return res.status(200).json(user)
        }
        return res.status(404).json({message:"User Not Found"})
        // res.json(user)
    } catch (error:any) {
         //server side error
         return res.status(500).json(error.message)
    }
}



///get User By ID

export const getUserById:RequestHandler<{id:string}>=async(req,res)=>{
    try {
        const {id}=req.params
        let user:User = await (await DatabaseHelper.exec('getUserById', {id})).recordset[0]
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

export const updateUser = async(req:UserExtendedRequest, res:Response)=>{
    try {
        // Read from the body and hash
        const {name,email,password} =req.body
        let hashedPassword= await bcrypt.hash(password,10)
        //read params
        const {id}=req.params
        //create a connection and make request
        let user:User = await (await DatabaseHelper.exec('getUserById', {id})).recordset[0]

        if(!user){ //no user found
            return res.status(404).json({message:"User Not Found"})
        }
        //continue with the update process
        await DatabaseHelper.exec('updateUSer', {id,name,email,password:hashedPassword})
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
           let user:User = await (await DatabaseHelper.exec('getUserById', {id})).recordset[0]
           if(!user){ //no user found
               return res.status(404).json({message:"User Not Found"})
           }
            await DatabaseHelper.exec('deleteUser', {id})
           return res.status(200).json({message:"User Deleted"})
    } catch (error:any) {
        //server side error
        return res.status(500).json(error.message)  
    }
}

export const loginUser= async (req:Request, res:Response)=>{
    try {
        const{email,password}= req.body

        let user= await (await DatabaseHelper.query(`SELECT * FROM Users WHERE email='${email}'`)).recordset

        if(!user[0]){
            return res.status(404).json({message:"User not Found"})
          }
    
          let validPassword = await bcrypt.compare(password,user[0].password)
         
          if(!validPassword){
            return res.status(404).json({message:"User not Found"})
          }
        
         const payload= user.map(usr=>{
            const {password, isDeleted,emailSent,...rest}=usr
            return rest
         })
         const token = jwt.sign(payload[0], process.env.SECRET_KEY as string)
          res.status(200).json(token)

    } catch (error:any) {
          //server side error
          return res.status(500).json(error.message)
    }
}