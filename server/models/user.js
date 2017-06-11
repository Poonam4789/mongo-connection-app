var mongoose = require('mongoose');

var User = mongoose.model('User', {
    email: {
        type: String,
        trim : true,
        required: true,
        minlength : 1

    },
    completed: {
        type: Boolean,
        default:false
    },
    completedAt: {
        type: Number,
        default :null
    }
});

module.exports={User};