require("../models")
const request = require("supertest")
const app = require("../app")

const Album = require("../models/Album")
const Artist = require("../models/Artist")
const Genre = require("../models/Genre")

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

    expect(res.body[0].artists).toBeDefined()
    expect(res.body[0].artists.length).toBe(0)

    expect(res.body[0].genres).toBeDefined()
    expect(res.body[0].genres.length).toBe(0)
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

test("Post -> 'URL_SONGS/:id/artist', should return status code 200, res.body to be defined and res.body.length = 1", async () => {
    const result = await Artist.create({
        name: "Karol G",
        country: "colombia",
        formationYear:1966,
        image:"www.karolG.com"
    })
    const res = await request(app)
    .post(`${URL_SONGS}/${songId}/artists`)
    .send([result.id])
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.length).toBe(1)
    expect(res.body).toHaveLength(1)
   
    await result.destroy()
})

test("Post -> 'URL_SONGS/:id/genres', should return status code 200, res.body to be defined and res.body.length = 1", async () =>{
    const result = await Genre.create({
        name: "Regueton"
    })
    const res = await request(app)
    .post(`${URL_SONGS}/${songId}/genres`)
    .send([result.id])

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.length).toBe(1)

    await result.destroy()
})

test("Delete 'URL_SONGS' should return status code 204", async () => {
    const res = await request(app)
    .delete(`${URL_SONGS}/${songId}`)

    expect(res.statusCode).toBe(204)

     await album.destroy()
})