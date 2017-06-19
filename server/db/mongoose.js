var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);
//mongoose.connect(process.env.MONGOLAB_URI);
//mongodb://poonam.patel:asdfg@1989@ds131312.mlab.com:31312/todoapp
//mongodb://<dbuser>:<dbpassword>@ds131312.mlab.com:31312/todoapp

module.exports={
    mongoose
};