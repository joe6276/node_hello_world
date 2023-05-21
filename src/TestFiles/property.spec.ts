import request from 'supertest'
import { it,describe,expect } from 'vitest'
import app from '../server'
import { object } from 'joi'

describe('Property Tests', ()=>{
    //Should add a new Property
    it('Should add Property', ()=>{
        return request(app).post('/property')
        .expect(201)
        .expect("Content-Type", /json/)
        .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVlNmI2YTIzLTliNDYtNGZkZi05NzM5LTE5MzgyOGQ5YmE2MyIsIm5hbWUiOiJKb25hdGhhbiBOZGFtYnVraSIsImVtYWlsIjoiam9uYXRoYW5AZ21haWwuY29tIiwiaWF0IjoxNjg0NjM2ODAzLCJleHAiOjE2ODQ5OTY4MDN9.Y0IjQ09Q4raBCoGh-Is3Ad3r6oM_EE63lqgxsAD_5n0')
        .send({
            
                name:"Test House ",
                location:"Nyeri",
                lat:"32.05",
                lon:"-0.32",
                images:"link",
                videos:"link",
                price:20000,
                condition:"Good Condition"
        })
    .then((response:request.Response)=>{
        expect(response.body).toEqual(
            expect.objectContaining({
                message:expect.stringMatching('Property Added Successfully')
            })
        )
    })
    })


    //should not add if no token was provided
    it('Should  not add Property if no token provided ', ()=>{
        return request(app).post('/property')
        .expect(401)
        .expect("Content-Type", /json/)
       
        .send({
            
                name:"Test House ",
                location:"Nyeri",
                lat:"32.05",
                lon:"-0.32",
                images:"link",
                videos:"link",
                price:20000,
                condition:"Good Condition"
        })
    .then((response:request.Response)=>{
        expect(response.body).toEqual(
            expect.objectContaining({
                message:expect.stringMatching('Unathorized')
            })
        )
    })
}),


    //should get all Properties
    it('Should get all Properties', ()=>{
        return request(app).get('/property')
        .expect(200)
        .expect("Content-Type", /json/)
        .then((response:request.Response)=>{
            expect(response.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        id:expect.any(String),
                        isDeleted:expect.any(Number),
                        name:expect.any(String),
                        location:expect.any(String),
                        lat:expect.any(String),
                        lon:expect.any(String),
                        images:expect.any(String),
                        videos:expect.any(String),
                        price:expect.any(Number),
                        condition:expect.any(String),
                        owner:expect.any(String),
                    })
                ])
               )
        })
   
    })

    //should get one Property
    it('Should get one Property by ID', ()=>{
        return request(app).get('/property/3ef3efc5-152f-4416-a5a3-e468a006304f')
        .expect(200)
        .expect("Content-Type", /json/)
        .then((response:request.Response)=>{
            expect(response.body).toEqual(
 
                    expect.objectContaining({
                        id:expect.any(String),
                        isDeleted:expect.any(Number),
                        name:expect.any(String),
                        location:expect.any(String),
                        lat:expect.any(String),
                        lon:expect.any(String),
                        images:expect.any(String),
                        videos:expect.any(String),
                        price:expect.any(Number),
                        condition:expect.any(String),
                        owner:expect.any(String),
                    })
                
               )
        })
   
    })
    //should not get given wrong id

    it('Should not get one Property given wrong ID', ()=>{
        return request(app).get('/property/xyz')
        .expect(404)
        .expect("Content-Type", /json/)
        .then((response:request.Response)=>{
            expect(response.body).toEqual(
                    expect.objectContaining({
                        message:expect.stringMatching('Property Not Found')
                    })
                
               )
        })
   
    })

    /// should update property
    it('Should Update Property', ()=>{
        return request(app).put('/property/3ef3efc5-152f-4416-a5a3-e468a006304f')
        .expect(200)
        .expect("Content-Type", /json/)
        .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVlNmI2YTIzLTliNDYtNGZkZi05NzM5LTE5MzgyOGQ5YmE2MyIsIm5hbWUiOiJKb25hdGhhbiBOZGFtYnVraSIsImVtYWlsIjoiam9uYXRoYW5AZ21haWwuY29tIiwiaWF0IjoxNjg0NjM2ODAzLCJleHAiOjE2ODQ5OTY4MDN9.Y0IjQ09Q4raBCoGh-Is3Ad3r6oM_EE63lqgxsAD_5n0')
        .send({
            
                name:"Test House ",
                location:"Nyeri",
                lat:"32.05",
                lon:"-0.32",
                images:"link",
                videos:"link",
                price:20000,
                condition:"Good Condition"
        })
    .then((response:request.Response)=>{
        expect(response.body).toEqual(
            expect.objectContaining({
                message:expect.stringMatching('Property updated Successfully')
            })
        )
    })
    }),


     /// should not  update property given wrong ID
     it('Should not update given wrong   Property ID ', ()=>{
        return request(app).put('/property/xyz')
        .expect(404)
        .expect("Content-Type", /json/)
        .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVlNmI2YTIzLTliNDYtNGZkZi05NzM5LTE5MzgyOGQ5YmE2MyIsIm5hbWUiOiJKb25hdGhhbiBOZGFtYnVraSIsImVtYWlsIjoiam9uYXRoYW5AZ21haWwuY29tIiwiaWF0IjoxNjg0NjM2ODAzLCJleHAiOjE2ODQ5OTY4MDN9.Y0IjQ09Q4raBCoGh-Is3Ad3r6oM_EE63lqgxsAD_5n0')
        .send({
            
                name:"Test House ",
                location:"Nyeri",
                lat:"32.05",
                lon:"-0.32",
                images:"link",
                videos:"link",
                price:20000,
                condition:"Good Condition"
        })
    .then((response:request.Response)=>{
        expect(response.body).toEqual(
            expect.objectContaining({
                message:expect.stringMatching('Property Not Found')
            })
        )
    })
    })

    //delete Property
    it('Should delete a Property', ()=>{
        return request(app).delete('/property/3ef3efc5-152f-4416-a5a3-e468a006304f')
        .expect(200)
        .expect("Content-Type", /json/)
        .then((response:request.Response)=>{
            expect(response.body).toEqual(
                    expect.objectContaining({
                        message:expect.stringMatching('Property Deleted Successfully')
                    })
                
               )
        })
   
    }),

    //should not delete a property if the ID is wrong

    it('Should not get one Property given wrong ID', ()=>{
        return request(app).delete('/property/3ef3efc5-152f-4416-a5a3-e468a006304f')
        .expect(404)
        .expect("Content-Type", /json/)
        .then((response:request.Response)=>{
            expect(response.body).toEqual(
                    expect.objectContaining({
                        message:expect.stringMatching('Property Not Found')
                    })
                
               )
        })
   
    })
})