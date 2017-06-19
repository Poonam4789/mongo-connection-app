var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://poonam patel:poo040789nam@ds131312.mlab.com:31312/todoapp'||'mongodb://localhost:27017/TodoApp'); //mongodb://<dbuser>:<dbpassword>@ds131312.mlab.com:31312/todoapp

module.exports={
    mongoose
};