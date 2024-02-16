require('../models')
const request = require('supertest')
const app = require('../app')

const URL_GENRES = '/genres'
const genre = {
    name: 'pop'
}


let genreID

test("Post -> 'URL_GENRES' should return 201 status code 201, and res.body to be defined and res.body.name = genre.name", async () => {

    const res = await request(app)
    .post(URL_GENRES)
    .send(genre)

    genreID = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genre.name)
})

test("Get -> 'URL_GENRES, should return status code 200, res.body to be defined and res.body.lenght", async () => {
    const res = await request(app)
    .get(URL_GENRES)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.length).toBe(1)

})

test("GetOne -> 'URL_GENRES/:id' should return status code 200, res.body to be define and res.body.name = genre.name", async() => {
        const res = await request(app)
        .get(`${URL_GENRES}/${genreID}`)

        expect(res.statusCode).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body.name).toBe(genre.name)
})

test("Put -> 'URL_GENRES/:id' should return status code 200, res.body to be define and res.body.name= pop latino", async () => {
    const res = await request(app)
    .put(`${URL_GENRES}/${genreID}`)
    .send({name: "pop latino"})

    expect(res.statusCode).toBe(200)
    expect(res.body.name).toBeDefined()
    expect(res.body.name).toBe("pop latino")
})

test("Delte -> 'URL_GENRES/:id' should return status code 204", async () => {
    const res= await request(app)
    .delete(`${URL_GENRES}/${genreID}`)

    expect(res.statusCode).toBe(204)

    
})