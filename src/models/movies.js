const pool =  require('../config/database.js')


const getAllMovies = () => {
    const SQLQuery = 'SELECT * FROM movies'

    return pool.query(SQLQuery)
}

const getMoviesLimit = (page, limit) => {
    const SQLQuery = `SELECT * FROM movies LIMIT ${page} OFFSET ${limit}`

    return pool.query(SQLQuery)
}

const getMoviebyID = (id) => {
    const SQLQuery = `SELECT * FROM movies WHERE id=${id}`;

    return pool.query(SQLQuery)
}

const createMovie = (body) => {
    const SQLQuery = `INSERT INTO movies
                      VALUES ('${body.id}','${body.title}','${body.genres}','${body.year}')`

    return pool.query(SQLQuery)
}

const updateMovie =(body, id) =>{
    // const SQLQuery = `UPDATE movies
    //                   SET title = '${body.title}', genres =  '${body.genres}', '${body.year}'
    //                   WHERE id = '${id}'`

    const SQLQuery = `IF EXISTS
                        (SELECT * FROM movies WHERE id=${id}
                      BEGIN
                        UPDATE movies
                          SET title = '${body.title}', genres =  '${body.genres}', '${body.year}'
                          WHERE id = '${id}
                      END ELSE
                      BEGIN
                        INSERT INTO movies
                         VALUES ('${body.id}','${body.title}','${body.genres}','${body.year}
                      END
                      GO`

    return pool.query(SQLQuery)
}

const deleteMovie = (id) => {
    const SQLQuery = `DELETE FROM movies WHERE id=${id}`

    return pool.query(SQLQuery)
}

module.exports = {
    getAllMovies,
    getMoviesLimit,
    getMoviebyID,
    createMovie,
    updateMovie,
    deleteMovie
}