const User = require('../modal/User');

module.exports = async (req, res, next) => {
    try {
        if (!req.session.userId) {
            return res.redirect('/auth/login');
        }

        const user = await User.findById(req.session.userId); // שימוש ב-async/await
        if (!user) {
            return res.redirect('/auth/login');
        }

        next(); // אם הכל בסדר, המשך לנתיב הבא
    } catch (error) {
        console.error("Error in auth middleware:", error);
        res.redirect('/auth/login');
    }
};
