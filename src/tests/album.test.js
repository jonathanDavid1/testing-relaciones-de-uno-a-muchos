require("../models")
const request = require("supertest")
const app = require("../app")
const Artist = require("../models/Artist")


let artist

let album

let albumId

const URL_ALBUMS = '/albums'

beforeAll(async () => {
    artist = await Artist.create({
        name:"shakira",
        country: "colombia",
        formationYear: 1990,
        image: "www.shakira.com"
    })

    album = {
        name: 'lorem20',
        image: 'lorem40',
        releaseYear: 2010,
        artistId: artist.id

    }
})

test("Post -> 'URL_ALBUMS', should return status code 201, res.body to be defined and res.body.name = album.name", async () => {

    const res = await request(app)
        .post(URL_ALBUMS)
        .send(album)

    albumId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(album.name)
})
test("Get -> 'URL_ALBUMS', should return status code 200, res.body to be defined and res.body.length = 1", async () => {

    const res = await request(app)
        .get(URL_ALBUMS)


    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.length).toBe(1)
})

test("GetOne 'URL_ALBUMS' should return status code 200, res.body to be defined and res.body.name = album.name", async () => {
    const res = await request(app)
    .get(`${URL_ALBUMS}/${albumId}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(album.name)

})

test("Put 'URL_ALBUMS' should return status code 200, res.body to be defined and res.body.name = lorem21", async () => {
    const res = await request(app)
    .put(`${URL_ALBUMS}/${albumId}`)
    .send({name: "lorem21"})

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe("lorem21")

})

test("Delete 'URL_ALBUMS' should return status code 204", async () => {
    const res = await request(app)
    .delete(`${URL_ALBUMS}/${albumId}`)

    expect(res.status).toBe(204)

     await artist.destroy()
})