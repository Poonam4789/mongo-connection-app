require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyparser = require('body-parser');
const { ObjectID } = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');
var { authenticate } = require('./middleware/authenticate');
const bcryptjs = require('bcryptjs');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyparser.json());

app.post('/todos', authenticate, (req, res) => {
    var todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
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

app.get('/todos', authenticate, (req, res) => {
    Todo.find({
        _creator: req.user._id
    }).then((todos) => {
        res.send({ todos });
    }, (err) => {
        if (err) {
            res.status(400).send(err);
        }
    })
});

app.get('/todos/:id',(req,res)=>{
var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.post('/user/:id',authenticate, (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        res.status(404).send();
    }

    Todo.findOne({
        _id:id,
        _creator :req.user._id
    }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({ todo });
    }).catch((e) => {
        res.status(400).send(e);
    });
});

// app.delete('/todos/:id', authenticate, (req, res) => {
//     var id = req.params.id;
//     if (!ObjectID.isValid(id)) {
//         res.status(404).send();
//     }

//     Todo.findOne({
//         _id: id,
//         _creator: req.user._id
//     }).then((todo) => {
//         if (!todo) {
//             return res.status(404).send();
//         }
//         res.send({ todo });
//     }).catch((e) => {
//         res.status(400).send(e);
//     });
// });

app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.patch('/todos/:id',authenticate, (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);
    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }
    Todo.findOneAndUpdate({_id:id,_creator:req.user._id}, { $set: body }, { new: true }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({ todo });
    }).catch((e) => {
        res.status(400).send();
    });
});

app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);
    user.save().then((user) => {
       //res.send(user);
      return user.generateAuthToken();
       
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    })
});


app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    User.findByCredentials(body.email, body.password).then((user) => {
        //res.send(user);
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });
    }).catch((e) => {
        res.status(400).send();
    });

});

app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        req.status(200).send();
    }, () => {
        req.status(400).send();
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