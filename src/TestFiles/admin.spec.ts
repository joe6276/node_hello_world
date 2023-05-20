import app from '../server'
import request from 'supertest'
import {describe,it,expect} from 'vitest'


describe('Admin Controller Tests', ()=>{
    it('should approve a landlord',()=>{
        return request(app).put('/admin/ee6b6a23-9b46-4fdf-9739-193828d9ba63')
        .expect(200)
        .expect('Content-Type', /json/)
        .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjlkNTFiNTcyLWEzNTYtNDZlOS1iMTE1LTU1NTA2YTg0ZTEwMCIsIm5hbWUiOiJBZG1pbiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicm9sZXMiOiJhZG1pbiIsImlhdCI6MTY4NDU3MzM0MX0.XAWFPHExxeGyRQh_0zrwz4yWqhGEBru-dyMASpKenN4')
        .then((response:request.Response)=>{
            expect(response.body).toEqual(
                expect.objectContaining({
                    message:expect.stringMatching('Landlord Updated')
                })
            )
        })
    }),

    //in a case where no token was given
    it('should throw a 403 error if no token was provided',()=>{
        return request(app).put('/admin/ee6b6a23-9b46-4fdf-9739-193828d9ba63')
        .expect(401)
        .expect('Content-Type', /json/)
        .then((response:request.Response)=>{
            expect(response.body).toEqual(
                expect.objectContaining({
                    // message:expect.stringMatching('Unauthorized')
                    message:expect.stringMatching('Unathorized')
                })
            )
        })
    }),

    //incase we give a user token 

    it('should approve a landlord',()=>{
        return request(app).put('/admin/ee6b6a23-9b46-4fdf-9739-193828d9ba63')
        .expect(403)
        .expect('Content-Type', /json/)
        .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUwNmM5NWVkLWE1ZWMtNDYxMS1hMjRiLWI0YjRkNjA2OTYwZiIsIm5hbWUiOiJLZWx2aW4iLCJlbWFpbCI6ImtldkBnbWFpbC5jb20iLCJyb2xlcyI6InVzZXIiLCJpYXQiOjE2ODQ1NzUwMzB9.ynJDcbp8qRmBT5Lf_TIygmYrIvjlkvr7RTjXPQQk680')
        .then((response:request.Response)=>{
            expect(response.body).toEqual(
                expect.objectContaining({
                    message:expect.stringMatching('Forbidden')
                })
            )
        })
    })
})