const db = require('../models');
module.exports = app => {
    // Home route gets results from the DB
    app.get('/', (req, res) => {
        db.Headline.find({
                saved: false
            })
            .then((data) => {
                const dbHeadlines = {
                    headlines: data
                }
                res.render('home', dbHeadlines);
            })
            .catch((err) => {
                res.json(err);
            });
    });

    // Route for getting all headlines from the db
    app.get('/headlines', (req, res) => {
        db.Headline.find({})
            .then((data) => {
                const dbHeadlines = {
                    headlines: data
                }
                res.json(dbHeadlines);
            })
            .catch((err) => {
                res.json(err);
            });
    });

    // saved route gets saved results from the DB
    app.get('/saved', (req, res) => {
        db.Headline.find({
            saved: true
        }).populate('Note').then((data) => {
            const dbHeadlines = {
                headlines: data
            };
            res.render('saved', dbHeadlines);
        });
    });

    app.get('/headlines/:id', (req, res) => {
        db.Headline.findOne({
                _id: req.params.id
            })
            .populate('Note')
            .then((dbHeadline) => {
                res.json(dbHeadline);
            })
            .catch((err) => {
                res.json(err);
            });
    });

    app.post("/headlines/:id/save", (req, res) => {
        db.Headline.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: {
                saved: true
            }
        }).then((dbHeadline) => {
            res.json(dbHeadline);
        });
    });

    app.post("/headlines/:id/remove", (req, res) => {
        db.Headline.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: {
                saved: false
            }
        }).then((dbHeadline) => {
            res.json(dbHeadline);
        });
    });



}