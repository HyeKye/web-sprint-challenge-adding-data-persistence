// build your `Resource` model here
const db = require('../../data/dbConfig')

const getAll = () => {
    return db('resources')
}

const getById = id => {
    return db('resources').where('resource_id', id).first()
}

const create = resource => {
    return db('resources').insert(resource)
    .then (([id]) => {
        return getById(id)
    })
}

module.exports = {
    getAll,
    getById,
    create
}