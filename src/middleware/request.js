const getMovies = (req, res, next) => {
    console.log('A Request for Movies Received at ' + Date.now())
    next()
}

const getUsers = (req, res, next) => {
    console.log('A Request for Users Received at ' + Date.now())
    next()
}

module.exports = {
    getMovies,
    getUsers
}