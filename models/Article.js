// Dependencies
var mongoose = require("mongoose");

// Schema Reference
var Schema = mongoose.Schema;

// New Schema via Constructor
var ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    articleURL: {
        type: String,
        required: true,
        unique: true
    }
});

// Create our Model
var Article = mongoose.model("Article", ArticleSchema);

// Export our Model
module.exports = Article;