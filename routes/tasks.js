const express = require('express')
const router = express.Router()
const tasksController = require('../controllers/tasks')

router.get(
    '/',
    tasksController.getAllTasks
)


router.post(
    '/',
    tasksController.addTask
)

router.get(
    '/:id',
    tasksController.getSingleTask
)


router.patch(
    '/:id',
    tasksController.updateTask
)

router.delete(
    '/:id',
    tasksController.deleteTask
)

module.exports = router