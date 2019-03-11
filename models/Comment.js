// Dependencies
var mongoose = require("mongoose");

// Define our schema
var Schema = mongoose.Schema;

// Construct our schema
var CommentSchema = new Schema({
    commentName: {
        type: String,
        default: "Anonymous"
    },
    commentBody: {
        type: String,
        min: [5, "Please type a bigger comment!"],
        required: true
    },
    article: {
        type: Schema.Types.ObjectId,
        ref: "Article"
    }
});

// Create our model
var Comment = mongoose.model("Comment", CommentSchema);

// Export said model
module.exports = Comment;