const bcrypt = require('bcrypt');
const User = require('../modal/User');

module.exports = async (req, res) => {
    try {
        const { username, password } = req.body;

        // חיפוש המשתמש לפי שם משתמש
        const user = await User.findOne({ username });

        if (user) {
            // השוואת הסיסמה שהוזנה עם הסיסמה המאוחסנת
            bcrypt.compare(password, user.password, (err, same) => {
               
                if (same) {
                    req.session.userId=user._id
                    // אם הסיסמה תואמת, נווט לדף הבית
                    res.redirect('/');
                } else {
                    // אם הסיסמה לא תואמת, נווט לדף ההתחברות
                    res.redirect('/auth/login');
                }
            });
        } 
    } catch (error) {
        // טיפול בשגיאות אם מתרחשות במהלך החיפוש או במהלך הפעולה
        console.error(error);
        res.status(500).send('Error occurred while logging in');
    }
};
 
