// build your `Task` model here
const db = require('../../data/dbConfig')

const getAll = () => {
    return db('tasks').join('projects', 'tasks.project_id', 'projects.project_id')
}

const getById = id => {
    return db('tasks').where('task_id', id).first()
}

const create = task => {
    return db('tasks').insert(task)
    .then (([id]) => {
        return getById(id)
    })
}

module.exports = {
    getAll,
    getById,
    create
}