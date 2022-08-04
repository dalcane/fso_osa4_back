const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')



beforeEach(async () => {
    await Blog.deleteMany({})
    let blog = new Blog(helper.initialBlogs[0])
    await blog.save()
    blog = new Blog(helper.initialBlogs[1])
    await blog.save()
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
   const response =  await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
})

//sisällön perusteella pystyy hakemaan
test('a specific blog can be viewed', async () => {
    const response = await api.get('/api/blogs')
    const contents = response.body.map(r => r.title)
    expect(contents).toContain(
        'Test post'
    )
})

//id-kenttä on olemassa
test('id field exists', async () => {
    const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
})

//validi blogipostaus menee läpi

test('blogs can be posted', async () => {
    const newBlog = {
        title: 'Very test',
        author: 'This guy',
        url: 'tester.com',
        id: '1234567890123456784'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length +1)

    const title = blogsAtEnd.map(b => b.title)
    expect(title).toContain(
        'Very test'
    )
})

// test('no empty stuff', async () => {
//     const newBlog = {
//         title: 'badpost',
//         url: 'yup'
//
//     }
// })

afterAll(() => {
    mongoose.connection.close()
})