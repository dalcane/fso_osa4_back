const _ = require('lodash');

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((p, c) => p + c.likes, 0)
}

//Math.maxilla suurin arvo tykkäyksistä ja sen jälkeen palautetaan siihen matchaava postaus
const favoriteBlog = (blogs) => {
    let maxVal = Math.max(...blogs.map((c) => c.likes))
    return blogs.find(c => c.likes === maxVal)
}

//tällä hetkellä palauttaa vain nimen, vois laittaa palauttamaan objektin, missä myös count
// https://mikeheavers.com/tutorials/getting_the_most_commonly_repeated_object_value_from_an_array_using_lodash/
const mostPosts = (blogs) => {
    let nameArray = _.map(blogs, 'author')
    return _.chain(nameArray).countBy().toPairs().max(_.last).head().value()

}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostPosts,
}