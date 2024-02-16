require("../models")
const request = require("supertest")
const app = require("../app")

const URL_ARTIST = '/artists'

const artist = {
    name:"shakira",
    country: "colombia",
    formationYear: 1990,
    image: "www.shakira.com"
}


let artistId

test("Post -> 'URL_ARTIST' should return status code 201, res.body and res.body to be defined and res.body.name = artist.name", async () =>{
    const res = await request(app)
    .post(URL_ARTIST)
    .send(artist)

    artistId = res.body.id


    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(artist.name)
})

test("Get -> 'URL_ARTIST' should return status code 200, res.body and res.body to be defined and res.body.length = 1", async () =>{
    const res = await request(app)
    .get(URL_ARTIST)
    

   


    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.length).toBe(1)
})


test("GetOne -> 'URL_ARTIST' should return status code 200, res.body and res.body to be defined and res.body.name = artist.name", async () => {
    const res = await request(app)
    .get(`${URL_ARTIST}/${artistId}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(artist.name)
})

test("Put -> 'URL_ARTIST' should return status code 200, res.body to be defined and res.body.formationYear = formationYear: 1992", async () => {
    const res = await request(app)
    .put(`${URL_ARTIST}/${artistId}`)
    .send({formationYear: 1992})

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.formationYear).toBe(1992)
})

test("Delete -> 'URL_ARTIST' should return 204", async() => {
    const res = await request(app)
    .delete(`${URL_ARTIST}/${artistId}`)

    expect(res.statusCode).toBe(204)
})























