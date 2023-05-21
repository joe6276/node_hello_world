import { describe, it,expect } from "vitest";
import request from 'supertest'
import app from '../server'

describe('LandLords Tests', ()=>{
//     it('Should add a new Landlord',()=>{
//         return request(app).post('/landlords')
//         .expect(201)
//         .expect('Content-Type', /json/)
//         .send({
//             name:'John Doe',
//             email:'jdoe@gmail.com',
//             password:'Amazing@2023',
//             propertyDocs:'#links'
//         })
//         .then((response:request.Response)=>{
//             expect(response.body).toEqual(
//                 expect.objectContaining({
//                     message:expect.stringMatching('Landlord Created')
//                 })
//             )
//         })
//     }),

// // should fail if registering an existing email
//     it('Should fail if using existing Email',()=>{
//         return request(app).post('/landlords')
//         .expect(500)
//         .expect('Content-Type', /json/)
//         .send({
//             name:'John Doe',
//             email:'jdoe@gmail.com',
//             password:'Amazing@2023',
//             propertyDocs:'#links'
//         })
//         .then((response:request.Response)=>{
//             expect(response.body).toEqual(
//              expect.stringContaining('Violation')
//             )
//         })
//     })


// //test for validation

//     it('Should Validate name',()=>{
//         return request(app).post('/landlords')
//         .expect(404)
//         .expect('Content-Type', /json/)
//         .send({
//             name:'',
//             email:'jdoe@gmail.com',
//             password:'Amazing@2023',
//             propertyDocs:'#links'
//         })
//         .then((response:request.Response)=>{
//             expect(response.body).toEqual(
//                   expect.any(String)
//             )
//         })
//     }),

//     //Should get all approved

//     it('Should get all approved Landlords', ()=>{
//         return request(app).get('/landlords/approved')
//         .expect(200)
//         .expect('Content-Type', /json/)
//         .then((response:request.Response)=>{
//             expect(response.body).toEqual(
//                 expect.arrayContaining([
//                     expect.objectContaining({
//                         id:expect.any(String),
//                         name:expect.any(String),
//                         email:expect.any(String),
//                         propertyDocs:expect.any(String),
//                         isDeleted:expect.any(Number),
//                         approved:expect.any(Number),
//                         emailSent:expect.any(Number),
//                         password:expect.any(String)
//                     })
//                 ])
//             )
//         })
//     })
    
//     //should get all unapproved Landlords

//     it('Should get all unapproved Landlords', ()=>{
//         return request(app).get('/landlords/unapproved')
//         .expect(200)
//         .expect('Content-Type', /json/)
//         .then((response:request.Response)=>{
//             expect(response.body).toEqual(
//                 expect.arrayContaining([
//                     expect.objectContaining({
//                         id:expect.any(String),
//                         name:expect.any(String),
//                         email:expect.any(String),
//                         propertyDocs:expect.any(String),
//                         isDeleted:expect.any(Number),
//                         approved:expect.any(Number),
//                         emailSent:expect.any(Number),
//                         password:expect.any(String)
//                     })
//                 ])
//             )
//         })
//     })

//     //should get LandLord by ID
//     it('should get  LandLord by ID', ()=>{
//         return request(app).get('/landlords/get/35e0a3a1-f1a7-4ba9-9365-866228f3339e')
//         .expect(200)
//         .expect('Content-Type', /json/)
//         .then((response:request.Response)=>{
//             expect(response.body).toEqual( 
//                     expect.objectContaining({
//                         id:expect.any(String),
//                         name:expect.any(String),
//                         email:expect.any(String),
//                         propertyDocs:expect.any(String),
//                         isDeleted:expect.any(Number),
//                         approved:expect.any(Number),
//                         emailSent:expect.any(Number),
//                         password:expect.any(String)
//                     })
//             )
//         })
//     }),

//     //should get approved LandLord by Email
//     it('should get approved LandLord by Email', ()=>{
//         return request(app).get("/landlords/get?email='jonathan@gmail.com'")
//         .expect(200)
//         .expect('Content-Type', /json/)
//         .then((response:request.Response)=>{
//             expect(response.body).toEqual( 
//                     expect.objectContaining({
//                         id:expect.any(String),
//                         name:expect.any(String),
//                         email:expect.any(String),
//                         propertyDocs:expect.any(String),
//                         isDeleted:expect.any(Number),
//                         approved:expect.any(Number),
//                         emailSent:expect.any(Number),
//                         password:expect.any(String)
//                     })
//             )
//         })
//     })


//     //Should update LandLord
//     it('Should update LandLord', ()=>{
//         return request(app).put("/landlords/1bb06bc8-de9c-460e-a7cc-ee1d1399e552")
//         .expect(200)
//         .expect('Content-Type', /json/)
//         .send({
//             name:"John Doe",
//             email:'johndoe@gmail.com'
//         })
//         .then((response:request.Response)=>{
//             expect(response.body).toEqual( 
//                     expect.objectContaining({
//                        message:expect.stringMatching('Landlord Updated')
//                     })
//             )
//         })
//     })


//     //should not update given a wrong ID
//     it('Should not update given a wrong ID', ()=>{
//         return request(app).put("/landlords/xyz")
//         .expect(404)
//         .expect('Content-Type', /json/)
//         .send({
//             name:"John Doe",
//             email:'johndoe@gmail.com'
//         })
//         .then((response:request.Response)=>{
//             expect(response.body).toEqual( 
//                     expect.objectContaining({
//                        message:expect.stringMatching('Landlord Not Found')
//                     })
//             )
//         })
//     })


//     // Should Login Email

//     it('Should Login a Landlord ', ()=>{
//         return request(app).post("/landlords/login")
//         .expect(200)
//         .expect('Content-Type', /json/)
//         .send({
//             password:'Amazing@2023',
//             email:'johndoe@gmail.com'
//         })
//         .then((response:request.Response)=>{
//             expect(response.body).toEqual( 
//                     expect.objectContaining({
//                        message:expect.stringMatching('Login Successfull!!'),
//                        token:expect.any(String)
//                     })
//             )
//         })
//     })


//     //should not login given a wrong email

//     it('Should not login given a wrong email', ()=>{
//         return request(app).post("/landlords/login")
//         .expect(404)
//         .expect('Content-Type', /json/)
//         .send({
//             password:'Amazing@2023',
//             email:'johndoe1@gmail.com'
//         })
//         .then((response:request.Response)=>{
//             expect(response.body).toEqual( 
//                     expect.objectContaining({
//                        message:expect.stringMatching('User not Found'),
//                     })
//             )
//         })
//     }),

//      //should not login given a wrong password

//      it('Should not login given a wrong password', ()=>{
//         return request(app).post("/landlords/login")
//         .expect(404)
//         .expect('Content-Type', /json/)
//         .send({
//             password:'Amazing@20244',
//             email:'johndoe@gmail.com'
//         })
//         .then((response:request.Response)=>{
//             expect(response.body).toEqual( 
//                     expect.objectContaining({
//                        message:expect.stringMatching('User not Found'),
//                     })
//             )
//         })
//     }),


//     //Should delete a Landlord

//     it('Should delete a Landlord', ()=>{
//         return request(app).delete("/landlords/facb0631-6463-4418-a143-5cfc0cedd958")
//         .expect(200)
//         .expect('Content-Type', /json/)
//         .then((response:request.Response)=>{
//             expect(response.body).toEqual( 
//                     expect.objectContaining({
//                        message:expect.stringMatching('Landlord  Deleted'),
//                     })
//             )
//         })
//     })

    
//     //Should not delete given a wrong id/already deleted

    it('Should delete a Landlord', ()=>{
        return request(app).delete("/landlords/facb0631-6463-4418-a143-5cfc0cedd958")
        .expect(404)
        .expect('Content-Type', /json/)
        .then((response:request.Response)=>{
            expect(response.body).toEqual( 
                    expect.objectContaining({
                       message:expect.stringMatching('Landlord Not Found'),
                    })
            )
        })
    })

})




