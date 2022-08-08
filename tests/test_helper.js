const Blog = require('../models/blog')
const User = require('../models/user')


const initialBlogs = [
    {
        "title": "Test post",
        "author": "Anders",
        "url": "www.lol.com",
        "likes": 5,
        "id": "62e8e26480267b4a696be831"
    },
    {
        "title": "Test post 2 ",
        "author": "Anders",
        "url": "www.lol.com/2",
        "likes": 10,
        "id": "62e8ea947a3fa9523e406e08"
    },

]

const nonExistingId = async () => {
    const note = new Blog({ content: 'willremovethissoon', author: 'Johnny', url:'xd' })
    await note.save()
    await note.remove()

    return note._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(note => note.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}



module.exports = {
    initialBlogs, nonExistingId, blogsInDb, usersInDb,
}