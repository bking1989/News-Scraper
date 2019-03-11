// When you click on the comment button
$(document).on("click", ".articleComments", function() {
    // Capture our article ID
    var articleID = $(this).attr("data-id");

    // Apply ID to our comment submit button
    $("button.commentSubmit").attr("data-id", articleID);

    // Show the modal
    $("#commentModal").modal("show");

    $.ajax({
        method: "GET",
        url: "/comments/" + articleID
    })
    .then(function(data) {
        // Set title for modal
        $("#commentHeader").text("Comments for " + data.title);

        // Fill with comments
        if (data.comments) {
            $("#commentsModalBody").empty();

            data.comments.forEach(function(comment) {
                let newRow = `<tr data-rowid="${comment._id}"><th class="text-center">${comment.commentName}</th><td class="text-center">${comment.commentBody}</td><td class="text-center"><button class="btn btn-danger btn-sm deleteBtn" data-commentid="${comment._id}"><b>X</b></button></td></tr>`;

                $("#commentsModalBody").prepend(newRow);
            })
        }
    });
});

// When you click the delete button
$(document).on("click", ".deleteBtn", function() {
    // Get the unique comment ID
    var commentID = $(this).data("commentid");

    $.ajax({
        method: "DELETE",
        url: "/comments/" + commentID
    });

    $(this).parent().parent().remove();
});

// When you click to submit a comment
$(document).on("click", ".commentSubmit", function() {
    // Capture our article ID
    var articleID = $(this).attr("data-id");

    $.ajax({
        method: "POST",
        url: "/comments/" + articleID,
        data: {
            commentName: $("#nameField").val().trim(),
            commentBody: $("#bodyField").val().trim(),
            article: articleID
        }
    })
    .then(function() {
        $("#commentName").val("");
        $("#commentBody").val("");
        $("#commentModal").modal("hide");
        location.reload();
    })
    .catch(function(err) {
        console.log(err);
    });
});

// When you click the update button
$(document).on("click", ".updateBtn", function() {
    $.ajax({
        method: "GET",
        url: "/scrape"
    }).then(function() {
        setTimeout(function() {location.reload();}, 2000);
    });
});