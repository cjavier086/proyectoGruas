var mongoose = require('./mongoose')

var userSchema = mongoose.Schema({
    username: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        trim: true
    }
});

var User = mongoose.model('User', userSchema);

module.exports = User;