import { Request, Response } from "express";
import {v4 as uid} from 'uuid'
import bcrypt from 'bcrypt'
import { registrationSchema } from "../Helpers/landlordValidations";
import dotenv from 'dotenv'
import path from 'path'
dotenv.config({path:path.resolve(__dirname, '../../.env')})
import jwt from 'jsonwebtoken'
import { DatabaseHelper } from "../DatabaseHelper";
import { LandLord, LandLordExtendedRequest } from "../Interfaces";
import { log } from "console";

export const addLandlord = async (req:LandLordExtendedRequest, res:Response)=>{
    try {
        // From Request.body read:
        const {name,email,password,propertyDocs} =req.body

        //validate first
        const {error}= registrationSchema.validate(req.body)
        if(error){
            return res.status(404).json(error.details[0].message)
        }
        //hash password
        let hashedPassword= await bcrypt.hash(password,10)
        let id =uid()
        await DatabaseHelper.exec('insertLandLord',{id,name,email,propertyDocs ,password:hashedPassword})
        res.status(201).json({message:"Landlord Created"})
    } catch (error:any) {
         //server side error
         return res.status(500).json(error.message)
    }
}


///Get All unapproved 

export const getApproved= async (req:Request, res:Response)=>{
    try {
        
      let approved= (await DatabaseHelper.exec('getLandLordsByStatus', {type:'approved'})).recordset
      return res.status(200).json(approved)

    } catch (error:any) {
        //server side error
        return res.status(500).json(error.message)
    }
}


export const getUnApproved= async (req:Request, res:Response)=>{
    try {
  
        let unapproved= (await DatabaseHelper.exec('getLandLordsByStatus', {type:'unapproved'})).recordset
        return res.status(200).json(unapproved)
        
    } catch (error:any) {
        //server side error
        return res.status(500).json(error.message)
    }
}



export const getLandLordById= async (req:Request<{id:string}>, res:Response)=>{
    try {
        const {id} =req.params

        let landlord=(await DatabaseHelper.exec('getLandLordById', {id})).recordset
        if(landlord.length==0){
           return res.status(404).json({message:"Landlord Not Found"})
        }
        return res.status(200).json(landlord[0])
        
    } catch (error:any) {
        //server side error
        return res.status(500).json(error.message)
    }
}


export const getLandLordByEmail= async (req:Request, res:Response)=>{
    try {
        const {email} =req.query as{email:string}
        log(email)
       //check if the email provided is correct- if yes (user exist )if no(user doesn't exist)
      let landlord:LandLord[]= (await DatabaseHelper.exec('getLandLordsByEmail', {email})).recordset
        log(landlord)
       
        if(!landlord.length){
           return res.status(404).json({message:"Landlord Not Found"})
        }
        return res.status(200).json(landlord[0])
        
    } catch (error:any) {
        //server side error
        return res.status(500).json(error.message)
    }
}


export const updateLandlord=async(req:Request<{id:string}>, res:Response)=>{
        try {
            const {id} =req.params
            let landlord=(await DatabaseHelper.exec('getLandLordById', {id})).recordset
            if(landlord.length==0){
            return res.status(404).json({message:"Landlord Not Found"})
            }
          
            const {name,email} =req.body
            await DatabaseHelper.exec('updateLandlord',{id,email,name})
            return res.status(200).json({message:"Landlord Updated"})
          } 
        catch (error:any) {
         //server side error
         return res.status(500).json(error.message) 
    }
}


export const deleteLandLord=async(req:Request<{id:string}>, res:Response)=>{
    try {
        const {id} =req.params

        let landlord=(await DatabaseHelper.exec('getLandLordById', {id})).recordset
        if(landlord.length==0){
        return res.status(404).json({message:"Landlord Not Found"})
        }
        await DatabaseHelper.exec('deleteLandlord', {id})
        return res.status(200).json({message:"Landlord  Deleted"})
      } 
    catch (error:any) {
     //server side error
     return res.status(500).json(error.message) 
}
}


export const loginLandlord= async(req:Request, res:Response)=>{
    try {
      const {email,password}= req.body as {email:string, password:string}
      //check if the email provided is correct- if yes (user exist )if no(user doesn't exist)
      let landlord:LandLord[]= (await DatabaseHelper.exec('getLandLordsByEmail', {email})).recordset
      if(!landlord[0]){
        return res.status(404).json({message:"User not Found"})
      }

      let validPassword = await bcrypt.compare(password,landlord[0].password)
     
      if(!validPassword){
        return res.status(404).json({message:"User not Found"})
      }
        const payload= landlord.map(landl=>{
            const {password,isDeleted,emailSent,propertyDocs,approved,...rest}= landl
            return rest
        })
      // token 
      const token = jwt.sign(payload[0], process.env.SECRET_KEY as string, {expiresIn:'360000s'})
      return res.status(200).json({message:"Login Successfull!!",token})
    } catch (error:any) {
        //server side error
     return res.status(500).json(error.message) 
    }

}