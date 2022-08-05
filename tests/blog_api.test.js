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

describe('general tests for get', () => {

    //4.8
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    //4.8
    test('all blogs are returned', async () => {
        const response =  await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })
    //serch by content works
    test('a specific blog can be viewed', async () => {
        const response = await api.get('/api/blogs')
        const contents = response.body.map(r => r.title)
        expect(contents).toContain(
            'Test post'
        )
    })

    //4.9 id-kenttä on olemassa
    test('id field exists', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })
})

describe('posting blogs', () =>{
    //4.10 valid blogpost goes through
    test('blogs can be posted', async () => {
        const newBlog = {
            title: 'Very test',
            author: 'This guy',
            url: 'tester.com',
            likes: '7'
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
    //4.11
    test('likes default to 0', async () => {
        const newBlog = {
            title: 'Very test 2',
            author: 'This guy',
            url: 'tester.com',
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()

        //the first two blogs have 5 and 10 likes, respectively and the last value is 0 as expected
        expect(blogsAtEnd.map(b => b.likes)).toEqual([5,10,0])
    })

    //4.12 bad request on empty title and url
    test('no empty stuff', async () => {
        const newBlog = {
            author: 'mie'
        }

        await api
            .post ('/api/blogs')
            .send(newBlog)
            .expect(400)
    })
})

//4.13
describe('deleting blogs', () => {
    test('delete a valid valid id', async () => {
        const blogs = await helper.blogsInDb()
        const blogToDelete = blogs[0]
        const id = blogs[0].id;
        await api.delete(`/api/blogs/${id}`).expect(204)

        const blogsNew = await helper.blogsInDb()
        expect(blogsNew).toHaveLength(blogs.length - 1)

        const titles = blogsNew.map((b) => b.title)
        expect(titles).not.toContain(blogToDelete.content)
    });

})
//4.14
describe('updating blogs', () => {
    test('update a blog posts likes', async () => {
        const updateLikes = {
            likes: 7
        }
        const blogs = await helper.blogsInDb()
        const id = blogs[0].id
        await api.put(`/api/blogs/${id}`) //need to send as well for some reason, unlike in back end
            .send(updateLikes)
            .expect(204)

        const updatedBlogs = await helper.blogsInDb()
        expect(updatedBlogs[0].likes).toBe(7)
    })
})

afterAll(() => {
    mongoose.connection.close()
})