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
        // VALUES(@id,@name,@email,@propertyDocs,@password)

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