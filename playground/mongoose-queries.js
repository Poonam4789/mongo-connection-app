const{ ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

//var userId = '593d31691481eccbfb2c1eb0';
var userId = req
// var id = '593ee5e8c3fb96dac569edd711';

// if(!ObjectID.isValid(id)){
// console.log('id not found ');
// };

if(!ObjectID.isValid(userId)){
console.log('id not found ');
};

// Todo.find({
//     _id: id
// }).then((todos)=>{
// console.log('todos are ', todos);
// });

// Todo.findOne({
//     _id:id
// }).then((todo)=>{
// console.log('todo is ', todo);
// });

// Todo.findById(id).then((todo)=>{
// if(!todo){
//     return console.log('No Todo found by id ');
// }
//     console.log('Todo by id ',todo);
// }).catch((e)=>console.log(e));

// User.find({_id:userId}).then((users)=>{
// console.log('list of users are ',users);
// });

// User.findOne({_id:userId}).then((user)=>{
// console.log('user is ',user);
// });

User.findById(userId).then((user)=>{
console.log('user is ',user);
}).catch((e)=>console.log(e));