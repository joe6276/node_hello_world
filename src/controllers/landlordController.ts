import { Request, Response } from "express";
import mssql from 'mssql'
import {v4 as uid} from 'uuid'
import { sqlConfig } from "../config";
import bcrypt from 'bcrypt'


interface ExtendedRequest extends Request{
body:{
    name:string
    email:string
    propertyDocs:string
    password:string
}
}

export const addLandlord = async (req:ExtendedRequest, res:Response)=>{
    try {
        // From Request.body read:
        const {name,email,password,propertyDocs} =req.body
        //hash password
        let hashedPassword= await bcrypt.hash(password,10)
        let id =uid()
        const pool= await mssql.connect(sqlConfig)
        await pool.request()
        .input('id', id)
        .input('name', name)
        .input('email', email)
        .input('propertyDocs', propertyDocs)
        .input('password', hashedPassword)
        .execute('insertLandLord')
        res.status(201).json({message:"Landlord Created"})
    } catch (error:any) {
         //server side error
         return res.status(500).json(error.message)
    }
}


///Get All unapproved 

export const getApproved= async (req:Request, res:Response)=>{
    try {
        
        const pool = await mssql.connect(sqlConfig)
       let approved= await (await pool.request()
        .input('type', 'approved')
        .execute('getLandLordsByStatus')).recordset
        return res.status(200).json(approved)

    } catch (error:any) {
        //server side error
        return res.status(500).json(error.message)
    }
}


export const getUnApproved= async (req:Request, res:Response)=>{
    try {
        
        const pool = await mssql.connect(sqlConfig)
       let approved= await (await pool.request()
        .input('type', 'unapproved')
        .execute('getLandLordsByStatus')).recordset
        return res.status(200).json(approved)
        
    } catch (error:any) {
        //server side error
        return res.status(500).json(error.message)
    }
}



export const getLandLordById= async (req:Request<{id:string}>, res:Response)=>{
    try {
        const {id} =req.params
        const pool = await mssql.connect(sqlConfig)
       let landlord= await (await pool.request()
        .input('id', id)
        .execute('getLandLordById')).recordset

        if(landlord.length==0){
           return res.status(404).json({message:"Landlord Not Found"})
        }
        return res.status(200).json(landlord[0])
        
    } catch (error:any) {
        //server side error
        return res.status(500).json(error.message)
    }
}


export const getLandLordByEmail= async (req:Request<{id:string}>, res:Response)=>{
    try {
        const {email} =req.query
        const pool = await mssql.connect(sqlConfig)
       let landlord= await (await pool.request()
        .input('email', email)
        .execute('getLandLordByEmail')).recordset

        if(landlord.length==0){
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

            const pool =await mssql.connect(sqlConfig)
            let landlord= await (await pool.request()
            .input('id', id)
            .execute('getLandLordById')).recordset

            if(landlord.length==0){
            return res.status(404).json({message:"Landlord Not Found"})
            }
          
            const {name,email} =req.body
            await pool.request()
            .input('id', id)
            .input('email', email)
            .input('name', name)
            .execute('updateLandlord')
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

        const pool =await mssql.connect(sqlConfig)
        let landlord= await (await pool.request()
        .input('id', id)
        .execute('getLandLordById')).recordset
        if(landlord.length==0){
        return res.status(404).json({message:"Landlord Not Found"})
        }
        await pool.request()
        .input('id', id)
        .execute('deleteLandlord')
        return res.status(200).json({message:"Landlord  Deleted"})
      } 
    catch (error:any) {
     //server side error
     return res.status(500).json(error.message) 
}
}