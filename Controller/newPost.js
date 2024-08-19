module.exports = (req, res) => {
    if (req.session.userId) {
        // Render the 'create' template and pass the createPost variable
        res.render('create', { createPost: true });
        return;
    }
    res.redirect('/auth/login');
};
