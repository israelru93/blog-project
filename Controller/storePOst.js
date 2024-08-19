const Blogpost = require('../modal/Blogpost');
const path = require('path');

module.exports = (req, res) => {
    let image = req.files.image;
    image.mv(path.resolve(__dirname, '..', 'public/assets/img/', image.name), async (error) => {
        if (error) {
            return res.status(500).send(error);
        }

        await Blogpost.create({
            ...req.body,
            image: '/assets/img/' + image.name,
            userid:req.session.userId
        });

        res.redirect('/');
    });
};
