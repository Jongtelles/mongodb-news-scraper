//npm dependencies
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const cheerio = require('cheerio');
const axios = require('axios');
const mongoose = require('mongoose');
const logger = require('morgan');

// variables that require ENV configuration
const PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Requiring our models and connecting to the Mongo DB
const db = require('./models');
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// Express setup with our dependencies
const app = express();
// Importing our routes into app
require("./routes/routes.js")(app);

app.use(logger('dev'));
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// scrape route that will get our articles
app.get('/scrape', function (req, res) {
    db.Headline.deleteMany({saved: false}, function (err) {console.log(err)});
    axios.get('https://phys.org/space-news/').then(function (response) {
        const $ = cheerio.load(response.data);
        $('article.news-box.news-detail-box.clearfix').each(function (i, element) {
            const result = {};
            // headline
            result.title = $(this).children('h3').children('a').text();
            // link
            result.url = $(this).children('h3').children('a').attr('href');
            // summary
            result.summary = $(this).children('div.news-box-text').children('p').text();
            db.Headline.create(result).then(
                (dbHeadline) => {
                    console.log(dbHeadline);
                }
            )
        });
    });

    res.send('Scrape Complete');
});

app.listen(PORT, () => {
    console.log('App listening on PORT ' + PORT);
});