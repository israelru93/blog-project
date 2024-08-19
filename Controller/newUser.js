module.exports = (req, res) => {
    // הגדרת משתנים לשמות משתמש וסיסמה ריקים
    let username = '';
    let password = '';

    // קבלת נתונים מ-flash
    const data = req.flash('data')[0];
    if (typeof data !== "undefined") {
        username = data.username;
        password = data.password; // תיקן את הטעות כתיב כאן
    }

    // הצגת הטופס עם השגיאות והנתונים שנשמרו
    res.render('register', {
        errors: req.flash('errorMessages'),
        username: username,
        password: password
    });
};
