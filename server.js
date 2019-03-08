// Dependencies
var express = require("express");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var axios = require("axios");

// Establish our Database for Mongoose
var db = require("./models");

// Establish our Port
var PORT = process.env.PORT || 8080;

// Initialize Express
var app = express();

// Parse Requests as JSON Data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Declare our Public Folder
app.use(express.static("./public"));

// Connect to our Database via Mongoose
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scrape_db";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// GET route for Scaping Website
app.get("/", function(req, res) {
    axios.get("http://www.kotaku.com/")
    .then(function(response) {
        var $ = cheerio.load(response.data);

        $("article.status-published").each(function (i, element) {
            // Scrape Required Information
            var result = {};

            result.title = $(this)
            .children("header")
            .children("h1")
            .children("a")
            .text();

            result.summary = $(this)
            .children("div.item__content")
            .children("div.excerpt")
            .children("p")
            .text();

            result.articleURL = $(this)
            .children("header")
            .children("h1")
            .children("a")
            .attr("href");

            // Create Article for Database
            db.Article.create(result)
            .then(function(dbArticle) {
                console.log(dbArticle);
            })
            .catch(function(err) {
                console.log(err);
            });
        });
    })
    .then(function() {
        // Load Page After Scrape
        db.Article.find({}).then(function (finalDB) {
            res.json(finalDB);
        });
    });
});

// Listener for PORT
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});