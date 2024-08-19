module.exports = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log('Error destroying session:', err);
            return res.redirect('/');  // להפנות בכל מקרה כדי למנוע בעיות נוספות
        }
        res.clearCookie('connect.sid');  // מחיקת עוגיה של הסשן לאחר ההרס
        res.redirect('/');
    });
};
