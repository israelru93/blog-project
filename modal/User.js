const mongoose = require('mongoose');
// יש לכתוב Schema עם אות גדולה
const Schema = mongoose.Schema;
var uniqeValidator =require('mongoose-unique-validator')
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true,'Please provide username'],  // שמירה על איות נכון
        unique: true
    },
    password: {
        type: String,
        required: [true,'Please provide password']  // שמירה על איות נכון
    }
});
UserSchema.plugin(uniqeValidator);
UserSchema.pre('save', async function(next) {
    const user = this;

    if (!user.isModified('password')) {
        return next();
    }

    try {
        const hash = await bcrypt.hash(user.password, 10);
        user.password = hash;
        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
