const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// תיקון של טעויות כתיב בשם הסכמה
const blogPostSchema = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    dataPosted: {
        type: Date,
        default: Date.now  // שימוש ב- Date.now כערך ברירת מחדל
    },
    image:String
});

// תיקון השגיאה ב- mongoose.model
const Blogpost = mongoose.model('Blogpost', blogPostSchema);

module.exports = Blogpost;
