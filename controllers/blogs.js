const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const {request, response} = require("express");

//showing all blog posts
blogsRouter.get('/',async (request, response) => {
    const blogs = await Blog.find({})
    response
        .status(200)
        .json(blogs)
})

//showing a single blog post
blogsRouter.get("/:id", async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    blog ? response.json(blog) : response.status(404).end()
});

//posting a new blog
blogsRouter.post('/', async (request, response, next) => {
    const blog = new Blog(request.body)
    try {
        const savedBlog = await blog.save()
        response
            .status(201)
            .json(savedBlog)
    } catch (exception) {
        next(exception)
    }
})

//4.13 deleting a single blog post
blogsRouter.delete('/:id', async (request, response, next) => {
   try {
       await Blog.findByIdAndRemove(request.params.id)
       response.status(204).end()
   } catch (exception) {
       next(exception)
   }
})

//4.14 editing a blog post (only likes as suggested by material)

blogsRouter.put('/:id', async (req, res, next) =>{
    const body = req.body

    const blog = {
        likes: body.likes
    }
    try {
        await Blog.findByIdAndUpdate(req.params.id, blog )
        res.status(204).end()
    } catch (e) {
        next(e)
    }
})
module.exports = blogsRouter