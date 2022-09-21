// build your `/api/tasks` router here
const router = require('express').Router()
const Task = require('./model')

router.get('/', async (req, res, next) => {
    try {
        const tasks = await Task.getAll()
        res.send(tasks.map((el) => ({ ...el, task_completed: el.task_completed ? true : false}) ))
    } catch (err) {
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const newTask = await Task.create(req.body)
        res.send({ ...newTask, task_completed: newTask.task_completed ? true : false})
    } catch (err) {
        next(err)
    }
})

router.use((err, req, res, next) => { //eslint-disable-line 
    res.status(500).json({
        customMessage: 'something went wrong inside the task router',
        message: err.message,
        stack: err.stack,
    })
})

module.exports = router