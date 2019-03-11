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
        $("#commentHeader").text("Comments for " + data.title);

        if(data.comment){
        };
    });
});

// When you click to submit a comment
$(document).on("click", ".commentSubmit", function() {
    // Capture our article ID
    var articleID = $(this).attr("data-id");

    $.ajax({
        method: "POST",
        url: "/" + articleID,
        data: {
            commentName: $("#nameField").val().trim(),
            commentBody: $("#bodyField").val().trim()
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
        setTimeout(function() {location.reload();}, 3000);
    });
});