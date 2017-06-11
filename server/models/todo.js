var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        default:null,
        required: true,
        minlength : 1
    },
    completed: {
        type: Boolean,
        default:false

    },
    completedAt: {
        type: Number,
        default:123
    }
});

module.exports={Todo};