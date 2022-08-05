const _ = require('lodash');

const dummy = (blogs) => {
    return 1
}

//4.4
const totalLikes = (blogs) => {
    return blogs.reduce((p, c) => p + c.likes, 0)
}

//4.5 Math.maxilla suurin arvo tykkäyksistä ja sen jälkeen palautetaan siihen matchaava postaus
const favoriteBlog = (blogs) => {
    const maxVal = Math.max(...blogs.map((c) => c.likes))
    return blogs.find(c => c.likes === maxVal)
}

//4.6 eniten blogipostauksia
const mostBlogs = (blogs) => {
    const nameArray = _.map(blogs, 'author')
    return _.chain(nameArray).countBy().toPairs().max(_.last).value()
}

//4.7
const mostLikes = (blogs) => {

    //creating a Map where the likes of all of the writers blogs are summed
    const map = new Map();
    for(const {author, likes} of blogs) {
        const currSum = map.get(author) || 0;
        map.set(author, currSum + likes);
    }

    //creating an array from that map
    const res = Array.from(map, ([author, likes]) => ({author, likes}));

    //finding the most likes out of the array
    const maxLikes = Math.max(...res.map(o => o.likes))

    //returning the object from the created array where the likes match maxLikes
    return res.find(({likes})=> likes === maxLikes)
}




module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
}