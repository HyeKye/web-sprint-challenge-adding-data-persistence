// build your `/api/projects` router here
const router = require('express').Router()

const Project = require('./model')

router.get('/', async (req, res, next) => {
    try {
        const projects = await Project.getAll()
        res.send(projects.map((el) => ({ ...el, project_completed: el.project_completed ? true : false}) ))
    } catch (err) {
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const newProject = await Project.create(req.body)
        res.send({ ...newProject, project_completed: newProject.project_completed ? true : false})
    } catch (err) {
        next(err)
    }
})

router.use((err, req, res, next) => { //eslint-disable-line 
    res.status(500).json({
        customMessage: 'something went wrong inside the project router',
        message: err.message,
        stack: err.stack,
    })
})

module.exports = router