import { Request, Response } from "express";
import mssql from 'mssql'
import {v4 as uid} from 'uuid'
import { sqlConfig } from "../config";

interface Landlord {
    id:string
    name:string
    email:string
    propertyDocs:string
    password:string
    isDeleted:number
    approved:number
    emailsent:number
}
export const approveLandlord=async(req:Request<{id:string}>, res:Response)=>{
    try {
        const {id}=req.params
        const pool= await mssql.connect(sqlConfig)
        let landlord:Landlord[]= await (await pool.request()
        .input('id', id)
        .execute('getLandLordById')).recordset[0]
        if(!landlord){
            return res.status(404).json({message:"LandLord Not Found"})
        }      
        // //first check if landlord exist(todo)
        await pool.request()
        .input('id',id)
        .execute('approveLandlord') 
        return res.status(200).json({message:"Landlord Updated"})
        
    } catch (error:any) {
         //server side error
         return res.status(500).json(error.message)
    }
}