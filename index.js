const express = require('express')
const mongoose = require('mongoose')
const cors = require ('cors')
const TodoModel = require('./Models/Todo')

const app = express()
app.use(cors())
app.use(express.json())

// mongoose.connect('mongodb://127.0.0.1:27017/test')

const atlasConnectionUri = 'mongodb+srv://mariam:12345@todoapp.ev0mwvc.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(atlasConnectionUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;


db.on('connected', () => {
  console.log('Connected to MongoDB Atlas');
});


db.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

app.get('/get', (req, res) => {
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.put('/update/:id', (req, res) => {
    const {id} = req.params;
    TodoModel.findByIdAndUpdate({_id: id}, {done: true})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.delete('/delete/:id', (req, res) => {
    const {id} = req.params;
    TodoModel.findByIdAndDelete({_id: id})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.post('/add', (req, res) => {
    const task = req.body.task;
    TodoModel.create({
        task: task
    })
    .then(result => res.json(result))
    .catch(err => res.json(err))

})

app.listen(3001, () => {
    console.log("Server is running")
}) 