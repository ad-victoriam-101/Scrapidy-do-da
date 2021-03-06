function displayResults() {
    $("#mainContent").empty();
    $.getJSON("/all", WebScrapeData => {
        WebScrapeData.forEach(function (data) {
            var card = $('<div>').addClass("card cardDiv").append(
                $("<h3>").addClass("card-title").text(data.title),
                $("<a>").attr("href", (data.link)).text("Link for Story"),
                $("<button>").addClass("btn btn-info data-button").text("Save").attr(
                    "type", "button")
            );
            card.addClass("col-md-4");
            // console.log(card);
            $("#mainContent").append(card);
        });
    });
}

displayResults();

$(document).on('click', ".data-button", function () {
    $.ajax({
            type: "POST",
            dataType: "json",
            url: "/submit",
            data: {
                title: $(".card-title").val(),
                link: $("a").val(),
                saved: true
            }
        })
        .then(data => {
            alert("article Saved.")
        });
})