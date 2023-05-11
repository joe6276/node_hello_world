import mssql from 'mssql';
import { sqlConfig } from '../config';

 export class DatabaseHelper{
    private static pool: Promise<mssql.ConnectionPool>= mssql.connect(sqlConfig)
      private static addInputsToRequest(request:mssql.Request, data:{[x:string]:string|number}={}){
             //request,  data={name:'John Doe' , age:120}
            const keys = Object.keys(data) //=['name', 'age']
            keys.map(keyName=>{
                return request.input(keyName, data[keyName])
                 // .input('name', mssql.VarChar ,'John Doe')
                //  .input('age', mssql.VarChar ,120)
            })
            return request
        }
    static async exec (storedProcedure:string, data:{[x:string]:string|number}={}){
        //storedProcedure='getUsers' data={}
        //storedProcedure='insertUser' data={name:'John Doe' , age:120}
        // create a request
        let  request :mssql.Request= await (await DatabaseHelper.pool).request() //empty( no inputs)
        request= DatabaseHelper.addInputsToRequest(request,data)
        return await request.execute(storedProcedure)
         
    }

    static async query(queryString:string){
        return (await DatabaseHelper.pool).request().query(queryString)   
    
    }
}

