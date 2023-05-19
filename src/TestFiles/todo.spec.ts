import {describe,it,expect} from 'vitest'
import app from '../server'
import request from 'supertest'

describe("Todo Tests", ()=>{
//add a new Todo
    it('Should add a new Todo', ()=>{
        return request(app).post('/todo')
        .expect('Content-Type', /json/)
        .expect(201)
        .send({
            title:'Todo 1',
            description:"The Description of Todo 1"   
        })
        .then((response:request.Response)=>{
            expect(response.body).toEqual(
                expect.objectContaining({
                    message:expect.stringContaining("Todo added successfully")
                })
            )
        })
    })

    // Get Todos

    it('should return the list of todos', ()=>{
        return request(app).get('/todo')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response:request.Response)=>{
            expect(response.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        id:expect.any(Number),
                        title:expect.any(String),
                        description:expect.any(String)
                    })
                ])
            )
        })

    })

    //Get one Todo

        
    it('should return the list of todos', ()=>{
        return request(app).get('/todo/1')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response:request.Response)=>{
            expect(response.body).toEqual(
           
                    expect.objectContaining({
                        id:expect.any(Number),
                        title:expect.any(String),
                        description:expect.any(String)
                    })
                
            )
        })

    })

    it('should return not found if todo id is wrong', ()=>{
        return request(app).get('/todo/18')
        .expect('Content-Type', /json/)
        .expect(404)
        .then((response:request.Response)=>{
            expect(response.body).toEqual(
                    expect.objectContaining({
                       message:expect.stringContaining("Todo not Found")
                    })   
            )
        })

    }),


    //update
    it('Update  todo',()=>{
        return request(app).put('/todo/1')
        .expect('Content-Type', /json/)
        .expect(200)
        .send({
            title:'Todo 1',
            description:"The Description of Todo 1"   
        })
        .then((response:request.Response)=>{
            expect(response.body).toEqual(
                    expect.objectContaining({
                       message:expect.stringContaining("Todo Updated")
                    })   
            )
        })
    })
    // update a todo that does not  exist
    it('Update  todo  if the id does not exist',()=>{
        return request(app).put('/todo/10')
        .expect('Content-Type', /json/)
        .expect(404)
        .send({
            title:'Updated Todo 1',
            description:"Updated description 1"
        })
        .then((response:request.Response)=>{
            expect(response.body).toEqual(
                expect.objectContaining({
                    message:expect.stringMatching('Todo not Found')
                })
            )
        })
    })

    //delete
    it('Delete  todo  if the id does not exist',()=>{
        return request(app).delete('/todo/10')
        .expect('Content-Type', /json/)
        .expect(404)
        .then((response:request.Response)=>{
            expect(response.body).toEqual(
                expect.objectContaining({
                    message:expect.stringMatching('Todo not Found')
                })
            )
        })
    })

    it('Delete  todo',()=>{
        return request(app).delete('/todo/1')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response:request.Response)=>{
            expect(response.body).toEqual(
                    expect.objectContaining({
                       message:expect.stringContaining("Todo Deleted")
                    })   
            )
        })
    })


})