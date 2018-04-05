const db = require('../models');
module.exports = app => {
    // Home route gets results from the DB
    app.get("/", (req, res) => {
        db.Headline.find({})
            .then((data) => {
                dbHeadlines = {
                    headlines: data
                }
                res.render('home', dbHeadlines);
            })
            .catch((err) => {
                res.json(err);
            });
    });

    // saved route
    app.get('/saved', (req, res) => {
        db.Headline.find({
            saved: true
        }).then((data) => {
            const articles = {};

        });
        res.render('home', )
    });
}