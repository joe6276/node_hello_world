
import express, {json} from 'express'
import router from './Routes'
import userRoutes from './Routes/userRoutes'
import landlordRoutes from './Routes/landLordRoutes'
import adminRoutes from './Routes/adminRoutes'
import propertyRoutes from './Routes/propertyRoutes'
import { log } from 'console'
import cors from 'cors'
const app=express()
app.use(cors())
app.use(json())// middleware

app.use('/todo',router)
app.use('/users', userRoutes)
app.use('/landlords', landlordRoutes)
app.use('/admin', adminRoutes)
app.use('/property', propertyRoutes)


app.listen(8080, ()=>{
    log('Server Running')
})






//http://localhost:4000/todo

//npm i -g nodemon

//npm init - initialize this as a node working directory
//package.json- has start scripts and lidt of dependencies used in the project
// tsc --init  - creats a ts config file
//all ts code will be in src folder , all Js code will be in dist folder
// package.lock.json -version (first npm i ....)
//node modules -this is where the dowloaded library is stored
//git-ignore (nodemodules-(npm i /npm install) /dist (tsc -w))

// @types/... originally all the libraries were written in Javascript
// we dont have the types
//and to work with typescript we require the types
// @types  to install the types of the libraries and we can now work with typescript fully