var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI||'mongodb://localhost:27017/TodoApp');
//mongodb://poonam.patel:asdfg@1989@ds131312.mlab.com:31312/todoapp
module.exports={
    mongoose
};