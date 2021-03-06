// Dependencies
var express = require("express");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var axios = require("axios");
var exphbs = require("express-handlebars");

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

// Set-up Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Connect to our Database via Mongoose
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scrape_db";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// GET route for app
app.get("/", function(req, res) {
    db.Article.find({}).sort({ dateCreated: 1 })
    .then(function(result) {
        var hbsObj = {
            articles: result
        };

        res.render("index", hbsObj);
    })
    .catch(function(err) {
        console.log(err);
    });
});

// GET route for website scrape
app.get("/scrape", function(req, res) {
    axios.get("https://css-tricks.com/")
    .then(function(response) {
        var $ = cheerio.load(response.data);

        let articles = $("#maincontent").find("div.articles-and-rail").find("div.articles").find("article.article-card").find("div.article-article");

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
            .catch(function(err) {
                console.log(err);
            });
        });

        res.send("Scrape complete!");
    });
});

// GET route for comments
app.get("/comments/:id", function (req, res) {
    db.Article.findOne({ _id: req.params.id })
        .populate("comments")
        .then(function (data) {
            res.json(data);
        })
        .catch(function (err) {
            console.log(err);
        });
});

// POST route for comments
app.post("/comments/:id", function(req, res) {
    db.Comment.create(req.body)
    .then(function(data) {
        return db.Article.findOneAndUpdate({ _id: req.params.id }, { $push: { comments: data._id } }, { new: true });
    })
    .then(function(response) {
        res.json(response);
    })
    .catch(function(err) {
        console.log(err);
    });
});

// DELETE route for deleting comments
app.delete("/comments/:id", function(req, res) {
    db.Comment.deleteOne({ _id: req.params.id })
    .catch(function(err) {
        console.log(err)
    });

    db.Article.findOneAndUpdate({ comments: req.params.id }, { $pull: { comments: req.params.id } })
    .catch(function(err) {
        console.log(err)
    });
});

// Listener for PORT
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});