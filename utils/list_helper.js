const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((p, c) => p + c.likes, 0)
}

//palauttaa not a numberin lol
const favoriteBlog = (blogs) => {
    let maxVal = Math.max(...blogs.map((c) => c.likes))
    return blogs.find(c => c.likes === maxVal)
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
}