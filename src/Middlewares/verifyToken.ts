import { NextFunction, Request, Response } from "express";
import dotenv from 'dotenv'
import path from 'path'
dotenv.config({path:path.resolve(__dirname, '../../.env')})
import jwt from 'jsonwebtoken'

interface DecodedData{
    id: string;
    name: string;
    email: string;
}

interface ExtendedRequest extends Request{
    info?:DecodedData
}

export const verifyToken =(req:ExtendedRequest, res:Response, next:NextFunction)=>{
    try {
       const token = req.headers['token'] as string
       
       if(!token){
         return res.status(401).json({message:'Unathorized'})
       } 

       //token  i need to check two things: is it expired, is it valid token
       const dedodedData = jwt.verify(token, process.env.SECRET_KEY as string) as DecodedData
       req.info=dedodedData

    } catch (error:any) {
        return res.status(403).json({message:error.message})
    }
    next()
}