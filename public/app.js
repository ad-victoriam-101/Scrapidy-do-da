function displayResults() {
    $("#mainContent").empty();
    $.getJSON("/all", WebScrapeData => {
        WebScrapeData.forEach(function (data) {
            var card = $('<div>').addClass("card cardDiv").append(
                $("<h3>").addClass("card-title").text(data.title),
                $("<a>").attr("href",(data.link)).text("Link for Story"),
                $("<button>").addClass("btn btn-info data-button").text("Save").attr(
                "type","button")
            );
            card.addClass("col-md-4");
            $("#mainContent").append(card);
        });
    });
}

displayResults();

$(document).on('click',"#data-button", function () {
    alert("clicked");
})