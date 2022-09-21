// build your `Project` model here
const db = require('../../data/dbConfig')

const getAll = () => {
    return db('projects')
}

const getById = id => {
    return db('projects').where('project_id', id).first()
}

const create = project => {
    return db('projects').insert(project)
    .then (([id]) => {
        return getById(id)
    })
}

module.exports = {
    getAll,
    getById,
    create
}