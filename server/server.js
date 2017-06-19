var express = require('express');
var bodyparser = require('body-parser');
var { ObjectID } = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyparser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        //console.log(JSON.stringify(doc,undefined,2));
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
        //res.send(e);
        //console.log('unable to save todo ',e);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({ todos });
    }, (err) => {
        if (err) {
            res.status(400).send(err);
        }
    })
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        res.status(404).send();
    }

     Todo.findById(id).then((todo) => {
         if(!todo){
            return res.status(404).send();
         }
          res.send({todo});
    }).catch((e)=>{
        res.status(400).send(e);
    });
});


app.listen(port, () => {
    console.log(`server is listening at port ${port}`);

});

// var newTodo = new Todo({
//     text: 'cook dinner'
// });

// newTodo.save().then((doc) => {
//     console.log('saved todo record ', doc);
// }, (e) => {
//     console.log('error saving todo ', e);
// });

// var secondTodo = new Todo({
//     text: 'do what ever you want to do'
// });

// secondTodo.save().then((doc)=>{
//     console.log('saved second Todo',doc);
// },(e)=>{
//     console.log('error in saving todo');
// });



// var firstUser = new User({
//    email :' poonam.patel@ril.com           '
// });

// firstUser.save().then((doc)=>{
//     console.log(JSON.stringify(doc,undefined,2));
// },(e)=>{
//     console.log('error in saving user',e);
// });

module.exports = { app };