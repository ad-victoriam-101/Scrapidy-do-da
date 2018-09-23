function displayResults(WebScrapeData) {
    $("#mainContent").empty();
    WebScrapeData.forEach(function(data){
        var card = $('<card>').append(
            $("<card-title>").text(data.title),
            $("<card-body").text(data.link),
            

        );
    });
}