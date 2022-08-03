const {totalLikes} = require("../utils/list_helper");
const listHelper = require("../utils/list_helper");
const dummyTest = require('../utils/list_helper').dummy

const listWithTwoBlogs = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    },
    {
        _id: '111',
        title: 'Go To Statement Considered',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 10,
        __v: 0
    },
    {
        _id: '222',
        title: 'Cool post',
        author: 'A. Hurme',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 2,
        __v: 0
    },
]


test('1. dummy returns one', () => {
    const blogs = []

    const result = dummyTest(blogs)
    expect(result).toBe(1)
})

describe('2. total likes on a blog list', () => {
    test('when list has only one blog equals the likes of that, multiple work as well', () => {
        const result = listHelper.totalLikes(listWithTwoBlogs)
        expect(result).toBe(17)
    })
})

describe('3. the blog with most likes is identified', () =>{
    test('this should find the most liked blog and return it', () =>{
        const result = listHelper.favoriteBlog(listWithTwoBlogs)
        expect(result).toEqual(
            {
            _id: '111',
            title: 'Go To Statement Considered',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 10,
            __v: 0
        })
    })
})

describe('4. the writer with most blog posts accompanied by the amount of blogs', () => {
    test('returning the writer with most blogs', ()=>{
        const result = listHelper.mostPosts(listWithTwoBlogs)
        expect(result).toEqual('Edsger W. Dijkstra')
    })
})