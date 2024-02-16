require("../models")
const request = require("supertest")
const app = require("../app")

const Album = require("../models/Album")

let song

let album

let songId

const URL_SONGS = '/songs'
beforeAll(async () => {
    album = await Album.create({
        name: 'lorem20',
        image: 'lorem40',
        releaseYear: 2010
        //artistId
    })

    song = {
        name: 'waka waka',
        albumId: album.id
    }
})


test("Post -> 'URL_SONGS', should return status code 201, res.body to be defined and res.body.name = song.name", async () => {

    const res = await request(app)
        .post(URL_SONGS)
        .send(song)

    songId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(song.name)
})
test("Get -> 'URL_SONGS', should return status code 200, res.body to be defined and res.body.length = 1", async () => {

    const res = await request(app)
        .get(URL_SONGS)


    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.length).toBe(1)
})

test("GetOne 'URL_SONGS' should return status code 200, res.body to be defined and res.body.name = song.name", async () => {
    const res = await request(app)
    .get(`${URL_SONGS}/${songId}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(song.name)

})

test("Put 'URL_SONGS' should return status code 200, res.body to be defined and res.body.name = TQG", async () => {
    const res = await request(app)
    .put(`${URL_SONGS}/${songId}`)
    .send({name: "TQG"})

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe("TQG")

})

test("Delete 'URL_SONGS' should return status code 204", async () => {
    const res = await request(app)
    .delete(`${URL_SONGS}/${songId}`)

    expect(res.statusCode).toBe(204)

     await album.destroy()
})