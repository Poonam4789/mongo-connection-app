var { ObjectID } = require('mongodb');
const { Todo } = require('./../../models/todo');
const { User } = require('./../../models/user');
const jwt = require('jsonwebtoken');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
    _id: userOneId,
    email: 'poonam@gmail.com',
    password :'userOnePass',
    tokens:[{
        access :'auth',
        token : jwt.sign({_id: userOneId ,access: 'auth'},'abc123').toString()
     }]
}, {
    _id: userTwoId,
    email: 'poonam.patel@gmail.com',
    password :'userTwoPass',
}];

const todos = [{
    _id: new ObjectID(),
    text: 'hello world'
}, {
    _id: new ObjectID(),
    text: 'goodbye world',
    completed :true,
    completedAt: 333
}];

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
};

const populateUsers = (done) => {
    User.remove({}).then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    Promise.all([userOne,userTwo]);
    }).then(() => done());
};

module.exports={
    todos,
    populateTodos,
    users,
    populateUsers
};