const Task = require('../models/task')

const getAllTasks = async (req, res, next) => {

    if ('isCompleted' in req.query) {
        return res.send(
            await Task.find(
                {
                    isCompleted: req.query.isCompleted
                }
            )
        )
    }

    return res.send(
        await Task.find()
    )
}

const addTask = async (req, res, next) => {

    const {name, isCompleted} = req.body

    const task = await Task.create(
        {
            name,
            isCompleted
        }
    )
        .catch(reason => {
            // console.log(reason)
            // res.send(reason)
            res.send(
                reason.errors[Object.keys(reason.errors)[0]].message
            )
        })


    if (task) {
        res.send('new task created')
    }


}

const getSingleTask = async (req, res, next) => {
    const {id} = req.params
    const task = await Task.findById(id)
        .catch(
            reason => {
                // console.log(reason)
                res.send(reason.message)
            }
        )

    if (!task) {
        return res.send('no task found')
    }

    res.send(task)

}

const updateTask = async (req, res, next) => {
    const {id} = req.params

    const task = await Task.findByIdAndUpdate(
        id,
        req.body,
        {
            new: true
        }
    )
        .catch(
            reason => {
                res.send(reason.message)
            }
        )

    if (!task) {
        return res.send('no task found to update')
    }
    res.send('task updated')

}

const deleteTask = async (req, res, next) => {
    const {id} = req.params
    const task = await Task.findByIdAndDelete(id)
        .catch(
            reason => {
                res.send(reason.message)
            }
        )

    if (!task) {
        return res.send('no task found to delete')
    }
    res.send(task)
}

module.exports = {
    getAllTasks,
    addTask,
    updateTask,
    deleteTask,
    getSingleTask
}