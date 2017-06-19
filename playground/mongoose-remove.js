const{ ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


// Todo.remove({}).then((result)=>{
// console.log(result);
// });

// Todo.findOneAndRemove('594809917b1a2f882eaffb0a').then((todo)=>{
// console.log(todo);
// });

Todo.findByIdAndRemove('594809dd7b1a2f882eaffb40').then((todo)=>{
    console.log(todo);
});