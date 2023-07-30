const taskRoutes = require('express').Router();
const taskData = require('../tasks.json');
const bodyParser = require("body-parser");
const path = require('path')
const fs = require("fs");


taskRoutes.use(bodyParser.urlencoded({ extended: false }));
taskRoutes.use(bodyParser.json());

taskRoutes.get('/', (req, res) => {
    res.status(200);
    res.send(taskData)
});


taskRoutes.get('/:taskid', (req, res) => {
    let taskId = req.params.taskid;
    let result = taskData.filter(val => val.taskId == taskId);

    res.status(200);
    res.send(result)
})


taskRoutes.post('/', (req,res)=> {
    const taskDetails = req.body;
    let writePath = path.join(__dirname, '..', 'tasks.json');
    let taskDataModified = JSON.parse(JSON.stringify(taskData));
    taskDataModified.push(taskDetails);
    fs.writeFileSync(writePath, JSON.stringify(taskDataModified), { encoding: 'utf-8', flag: 'w' });
    res.status(200);
    res.send("Task Added")
    
})

taskRoutes.post('/:taskid', (req, res) => {
    let taskIdPassed = req.params.taskid;
    let flagPassed = req.body;
    let writePath = path.join(__dirname,"..",'tasks.json')
    let taskDataModified = JSON.parse(JSON.stringify(taskData));
    let filteredTaskData = taskDataModified.filter(task => task.taskId == taskIdPassed);

    for (const task of taskDataModified) {
        if (task.taskId == taskIdPassed) {
            task.flag = flagPassed.flag;
            break;
        }
    }
    fs.writeFileSync(writePath, JSON.stringify(taskDataModified), { encoding: 'utf8', flag: 'w' });
    res.status(200).send({
        "message":`New Flag status is ${flagPassed.flag} for taskId ${taskIdPassed}`
    })
})

taskRoutes.delete('/:taskid', (req, res) => {
    try {
        const passedTaskId = req.params.taskid;

        //Read the task from file
        const tasks = JSON.parse(fs.readFileSync('tasks.json'));

        //Finding the index of the task with ID
        const taskIndex = tasks.findIndex((task) => task.taskId == passedTaskId);

        if (taskIndex == -1) {
            //Task not found
            return res.status(404).json({ message: 'Task Not Found' });

        }

        //Removing the task from the task array
        tasks.splice(taskIndex, 1);

        //Writing the updated tasks back to the file
        fs.writeFileSync('tasks.json', JSON.stringify(tasks));

        //Respond with success
        res.status(200).json({message:'File Updated'})
    } catch (err) {
        console.log(err)
        res.status(500).json({message:'Internal server error'})
    }
})
module.exports = taskRoutes;