import { Response,Request } from "express";
import mssql from 'mssql'
import {v4 as uid} from 'uuid'
import { sqlConfig } from "../config";

interface ExtendedRequest extends Request{
    body:{
        name:string,
        location:string
        lat:string
        lon:string
        images:string
        videos:string
        price:number
        condition:string
        owner:string
    }
}

interface Property {
    id:string
    isDeleted:number
    name:string,
    location:string
    lat:string
    lon:string
    images:string
    videos:string
    price:number
    condition:string
    owner:string
}
// VALUES(@id,@name,@location,@lat,@lon,@images, @videos,@price,@condition,@Owner)

export const addProperty = async(req:ExtendedRequest, res:Response)=>{
    try {
        let id=uid()
        const pool =await mssql.connect(sqlConfig)
        const {name,location,lat,lon,images,videos,price,condition,owner}=req.body
        await pool.request()
        .input('id',id)
        .input('name',name)
        .input('location',location)
        .input('lat',lat)
        .input('lon',lon)
        .input('images',images)
        .input('videos',videos)
        .input('price',price)
        .input('condition',condition)
        .input('owner',owner)
        .execute('insertProperty')
        return res.status(201).json({message:"Property Added Successfully"})
    } catch (error:any) {
        
         //server side error
         return res.status(500).json(error.message)
    }
}


//GET Properties 

export const getAllProperties =async (req:Request, res:Response)=>{
    try {
        const pool =await mssql.connect(sqlConfig)
        let properties:Property[]= (await pool.request().execute('getProperties')).recordset

        return res.status(200).json(properties)
    } catch (error:any) {
        
         //server side error
         return res.status(500).json(error.message)
    }
}


export const getProperty =async (req:Request<{id:string}>, res:Response)=>{
    try {
        const pool =await mssql.connect(sqlConfig)
        const {id}=req.params

        let property:Property[]= (await pool.request()
        .input('id',id)
        .execute('getProperty')).recordset

        if(!property){
            return res.status(404).json({message:"Property Not Found"})
        }

        return res.status(200).json(property)
    } catch (error:any) {
        
         //server side error
         return res.status(500).json(error.message)
    }
}

export const updateProperty = async (req:Request <{id:string}> ,res:Response)=>{
    try {
        const pool =await mssql.connect(sqlConfig)
        const {id}=req.params

        let property:Property[]= (await pool.request()
        .input('id',id)
        .execute('getProperty')).recordset

        if(!property.length){
            return res.status(404).json({message:"Property Not Found"})
        } 


        const {name,location,lat,lon,images,videos,price,condition,owner}=req.body
        await pool.request()
        .input('id',id)
        .input('name',name)
        .input('location',location)
        .input('lat',lat)
        .input('lon',lon)
        .input('images',images)
        .input('videos',videos)
        .input('price',price)
        .input('condition',condition)
        .input('owner',owner)
        .execute('updateProperty')
        return res.status(200).json({message:"Property updated Successfully"})
    } catch (error:any) {
         //server side error
         return res.status(500).json(error.message)
    }
}


///delete Property 
export const deleteProperty = async (req:Request <{id:string}> ,res:Response)=>{

    try {
        const pool =await mssql.connect(sqlConfig)
        const {id}=req.params

        let property:Property[]= (await pool.request()
        .input('id',id)
        .execute('getProperty')).recordset

        if(!property.length){
            return res.status(404).json({message:"Property Not Found"})
        } 
        
        await pool.request().input("id",id).execute('deleteProperty')
        return res.status(200).json({message:"Property Deleted Successfully"})
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}