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
    axios.get("https://css-tricks.com/")
    .then(function(response) {
        var $ = cheerio.load(response.data);

        let articles = $("#maincontent").find("div.articles-and-rail").find("div.articles").find("article.article-card").find("div.article-article");
        let counter = 0;

        $(articles).each(function (i, element) {
            // Scrape Required Information
            var result = {};

            result.title = $(this)
            .find("h2")
            .find("a")
            .text()
            .replace(/(\r\n|\n|\r)/gm, "")
            .trim();

            result.summary = $(this)
            .find("div.article-content")
            .find("p")
            .text();

            result.articleURL = $(this)
            .find("h2")
            .find("a")
            .attr("href");

            // Create Article for Database
            db.Article.create(result)
            .then(function(dbArticle) {
                console.log(dbArticle);
                counter++
                if(counter >= articles.length){       
                    db.Article.find({}).then(function (finalDB) {
                        res.json(finalDB);
                    });
                }
            })
            .catch(function(err) {
                console.log(err);
                counter++
            });
        });
    })
});

// Listener for PORT
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});