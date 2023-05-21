import request from 'supertest'
import { describe, it, expect } from 'vitest'
import app from '../server'

describe('JWT Tests', ()=>{
    //Should not allow expired JWT tokens
    it('Should not allow expired JWT tokens', ()=>{
        return request(app).post('/property')
        .expect(403)
        .expect("Content-Type", /json/)
        .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM1ZTBhM2ExLWYxYTctNGJhOS05MzY1LTg2NjIyOGYzMzM5ZSIsIm5hbWUiOiJKb2huIERvZSIsImVtYWlsIjoiam5kYW1idWtpdGVzdEBnbWFpbC5jb20iLCJpYXQiOjE2ODM3OTc5MDcsImV4cCI6MTY4NDE1NzkwN30.hUS5mpfgMaBvUehVSOBbzT4lVtXysoiOl6zW5L8n9bw')
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
                message:expect.stringMatching('jwt expired')
            })
        )
    })
    })
})