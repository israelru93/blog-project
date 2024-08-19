const User = require('../modal/User');

module.exports = async (req, res) => {
    try {
        await User.create(req.body);
        return res.redirect('/');
    } catch (error) {
        const errorMessages = Object.keys(error.errors).map(key => error.errors[key].message)
        req.flash('errorMessages',errorMessages )
        req.flash('data',req.body)
   
        return res.redirect('/auth/register');
    }
};
