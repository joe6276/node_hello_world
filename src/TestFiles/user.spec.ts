import request from 'supertest'
import app from '../server'
import {describe,it,expect} from 'vitest'
import { response } from 'express'

describe('Users Tests',()=>{

  //Get all Users
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
    }),

    //Post a new User
  // it('should add a new User',()=>{
  //   return request(app)
  //   .post('/users')
  //   .send({
  //     name:'Jonathan',
  //     email:'jojo1s@gmail.com',
  //     password:'Amazing@2023'
  //   })
  //   .expect('Content-Type', /json/)
  //   .expect(201)
  //   .then((response:request.Response)=>{
  //     expect(response.body).toEqual(
  //       expect.objectContaining({
  //         message:expect.any(String)
  //       })
  //     )
  //   })
  // }),


  //Get user
  it('should get user by Id ', ()=>{
    return   request(app).get('/users/user/7f643dd9-18c7-4797-ba1e-471802e05f4e')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response:request.Response)=>{
         expect(response.body).toEqual(
           
              expect.objectContaining({
                  id:expect.any(String),
                  name:expect.any(String),
                  email:expect.any(String),
                  roles:expect.any(String),
                  password:expect.any(String),
                  isDeleted:expect.any(Number),
                  emailSent:expect.any(Number)
              })
         )
      })
  })




  it('Should not get user given wrong ID',()=>{
    return request(app).get('/users/user/7f643dd9-18c7-4797-ba1e-471802e05f4erdffgfg')
    .expect('Content-Type', /json/)
    .expect(404)
    .then((response:request.Response)=>{
      expect(response.body).toEqual(
        expect.objectContaining({
          message:expect.stringMatching('User Not Found')
        })
      )
    })
  })

  it('Should not get  user given invalid Email',()=>{
    return request(app).get(`/users/one?email='jojoddd1s@gmail.com'`)
    .expect('Content-Type', /json/)
    .expect(404)
    .then((response:request.Response)=>{
      expect(response.body).toEqual(
        expect.objectContaining({
          message:expect.stringMatching('User Not Found')
        })
      )
    })
  })

//Update

  it('Should Updaate User given userId', ()=>{
    return request(app).put('/users/7f643dd9-18c7-4797-ba1e-471802e05f4e')
    .expect('Content-Type', /json/)
    .expect(200)
    .send({
      name:'Sir Jonathan',
      email:'j@gmail.com',
      password:'Amazing@2024'
    })
    .then((response:request.Response)=>{
      expect(response.body).toEqual(
        expect.objectContaining({
          message:expect.stringContaining('User Updated')
        })
      )
    })
  }),

  it('Should return not found given wrong userId', ()=>{
    return request(app).put('/users/fsdsd')
    .expect('Content-Type', /json/)
    .expect(404)
    .send({
      name:'Sir Jonathan',
      email:'j@gmail.com',
      password:'Amazing@2024'
    })
    .then((response:request.Response)=>{
      expect(response.body).toEqual(
        expect.objectContaining({
          message:expect.stringMatching('User Not Found')
        })
      )
    })
  })


  ///login

  it('Should login user given  valid email and password',()=>{
    return request(app).post('/users/login')
      .expect('Content-Type', /json/)
      .expect(200)
      .send({
        email:'j@gmail.com',
        password:'Amazing@2024'
      })
      .then((response:request.Response)=>{
        expect(response.body).toEqual(
            expect.any(String)
        )
      })

  }),


  
  it('Should not login given invalid email ',()=>{
    return request(app).post('/users/login')
      .expect('Content-Type', /json/)
      .expect(404)
      .send({
        email:'jass@gmail.com',
        password:'Amazing@2024'
      })
      .then((response:request.Response)=>{
        expect(response.body).toEqual(
           expect.objectContaining({
              message:expect.stringMatching('User not Found')
           })
        )
      })

  })



  
  it('Should not login given invalid password',()=>{
    return request(app).post('/users/login')
      .expect('Content-Type', /json/)
      .expect(404)
      .send({
        email:'j@gmail.com',
        password:'Amazing@2025'
      })
      .then((response:request.Response)=>{
        expect(response.body).toEqual(
          expect.objectContaining({
            message:expect.stringMatching('User not Found')
         })
        )
      })

  }),

  

//delete

// it('Should delete User given a correct Id',()=>{
//   return request(app).delete('/users/ecbfc1ae-b651-49e3-8ce7-62408a635c11')
//   .expect('Content-Type', /json/)
//   .expect(200)
//   .then((response:request.Response)=>{
//     expect(response.body).toEqual(
//       expect.objectContaining({
//         message:expect.stringMatching("User Deleted")
//       })
//     )
//     })
//   }),
  

//delete an already deleted User

it('Should delete User given a correct Id',()=>{
  return request(app).delete('/users/ecbfc1ae-b651-49e3-8ce7-62408a635c11')
  .expect('Content-Type', /json/)
  .expect(404)
  .then((response:request.Response)=>{
    expect(response.body).toEqual(
      expect.objectContaining({
        message:expect.stringMatching("User Not Found")
      })
    )
    })
  })
})








