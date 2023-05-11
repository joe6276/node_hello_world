import { Response,Request } from "express";
import mssql from 'mssql'
import {v4 as uid} from 'uuid'
import { sqlConfig } from "../config";
import { DatabaseHelper } from "../DatabaseHelper";
import { log } from "console";
import { Property, PropertyExtendedRequest } from "../Interfaces";

export const addProperty = async(req:PropertyExtendedRequest, res:Response)=>{
    try {
        let id=uid()
        const {name,location,lat,lon,images,videos,price,condition}=req.body
        if(req.info){

            await DatabaseHelper.exec('insertProperty', 
            {id,name,location,lat,lon,images,videos,price,condition, owner:req.info.id})

        }
        return res.status(201).json({message:"Property Added Successfully"})
    } catch (error:any) {
        
         //server side error
         return res.status(500).json(error.message)
    }
}


//GET Properties 

export const getAllProperties =async (req:Request, res:Response)=>{
    try {
        let properties:Property[]=(await DatabaseHelper.exec('getProperties')).recordset
        return res.status(200).json(properties)
    } catch (error:any) {
        
         //server side error
         return res.status(500).json(error.message)
    }
}


export const getProperty =async (req:Request<{id:string}>, res:Response)=>{
    try {
        const {id}=req.params
        let property:Property[]= (await DatabaseHelper.exec('getProperty', {id})).recordset
        if(!property.length){
            return res.status(404).json({message:"Property Not Found"})
        }

        return res.status(200).json(property)
    } catch (error:any) {
        
         //server side error
         return res.status(500).json(error.message)
    }
}

export const updateProperty = async (req:PropertyExtendedRequest  ,res:Response)=>{
    try {
        const {id}= req.params
        log(id)
        let property:Property[]= (await DatabaseHelper.exec('getProperty', {id})).recordset
        if(!property.length){
            return res.status(404).json({message:"Property Not Found"})
        } 
        const {name,location,lat,lon,images,videos,price,condition}=req.body
        if(req.info){
            await DatabaseHelper.exec('updateProperty',
         {id,name,location,lat,lon,images,videos,price,condition,owner:req.info.id})
        }

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

        let property:Property[]= (await DatabaseHelper.exec('getProperty', {id})).recordset

        if(!property.length){
            return res.status(404).json({message:"Property Not Found"})
        } 
        
        await DatabaseHelper.exec('deleteProperty', {id})
        return res.status(200).json({message:"Property Deleted Successfully"})
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}