 import { Request } from "express";
 export interface DecodedData{
    id: string;
    name: string;
    email: string;
    roles:string
}


export interface Landlord {
    id:string
    name:string
    email:string
    propertyDocs:string
    password:string
    isDeleted:number
    approved:number
    emailsent:number
}


export interface AdminExtendedRequest extends Request{
    info?:DecodedData
    params:{id:string}
}

///landLord
export interface Property {
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

export interface PropertyExtendedRequest extends Request{
    body:{
        name:string,
        location:string
        lat:string
        lon:string
        images:string
        videos:string
        price:number
        condition:string
        
    },
    params:{id:string}
    info?:DecodedData
}

///Landlord Interfaces
export interface LandLordExtendedRequest extends Request{
    body:{
        name:string
        email:string
        propertyDocs:string
        password:string
    }
    }
    
    
    export interface LandLord{
        id:string
        name:string
        email:string
        propertyDocs:string
        isDeleted:number
        approved:number
        password:string
        emailSent:string
    }
    
    