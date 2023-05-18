import request from 'supertest'
import app from './server'
import {describe,it,expect} from 'vitest'

describe('Users Tests',()=>{
    it('should get users ', ()=>{
      return   request(app).get('/users')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response:request.Response)=>{
           expect(response.body).toEqual(
             expect.arrayContaining([
                expect.objectContaining({
                    id:expect.any(String),
                    name:expect.any(String),
                    email:expect.any(String),
                    roles:expect.any(String),
                    password:expect.any(String),
                    isDeleted:expect.any(Number),
                    emailSent:expect.any(Number)
                })
            ])
           )
        })
    })
})