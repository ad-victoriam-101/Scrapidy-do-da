function displayResults(WebScrapeData) {
    $("#mainContent").empty();
    WebScrapeData.forEach(function(data){
        var card = $('<card>').append(
            $("<card-title>").text(data.title),
            $("<card-body").text(data.link),
            $("<button>").text("Save This link").addClass("btn btn-primary"),
            $(".btn").attr("id","isSaved")
        );
        card.addClass("col-md-3");
        $("#mainContent").append(card);
    });
}

$.getJSON("/all", data =>{
    displayResults(data);
});