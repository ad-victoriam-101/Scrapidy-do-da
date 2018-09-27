// start of Dependencies.
const express = require("express");
// mongo_DB
const mongojs = require("mongojs");
const request = require("request");
// Cheerio parses markup and provides an API for traversing/manipulating the resulting data structure.
const cheerio = require("cheerio");
// extract the entire body portion of an incoming request stream and exposes it on req.body
const bodyParser = require("body-parser");
// Mongoose's main value is that you can define schemas for your collections which are then enforced at the ODM layer
const mongoose = require("mongoose");
// Morgan is a request logger keeps track of HTTP requests and colors them. 
const logger = require("morgan");
// End of Dependencies.

var app = express();
app.use(logger("dev"));
// set up app with body-parser and static folders

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(express.static("public"));

// database Config
var dataBaseUrl = "WebScrape_db";
var collections = ["WebScrapeData"];

var db = mongojs(dataBaseUrl, collections);

db.on("error", (error) => {
  console.log("Data Base erroy: ", error);
});

app.get("/", (req, res) => {
  if (!req) {
    res.send(index.html);
  }
  res.send("Hello World");
});
// Retrieve scrapped data from the DB
app.get("/all", (req, res) => {
  db.WebScrapeData.find({}, function (error, found) {
    if (error) {
      console.log(error);
    } else {
      res.json(found);
    }
  });
});

app.get("/scrape", function (req, res) {
  // Make a request for the news section of `ycombinator`
  request("https://news.ycombinator.com/", function (error, response, html) {
    // Load the html body from request into cheerio
    var $ = cheerio.load(html);
    // For each element with a "title" class
    $(".title").each(function (i, element) {
      // Save the text and href of each link enclosed in the current element
      var title = $(element).children("a").text();
      var link = $(element).children("a").attr("href");

      // If this found element had both a title and a link
      if (title && link) {
        // Insert the data in the scrapedData db
        db.WebScrapeData.insert({
            title: title,
            link: link,
            saved: false
          },
          function (err, inserted) {
            if (err) {
              // Log the error if one is encountered during the query
              console.log(err);
            } else {
              // Otherwise, log the inserted data
              console.log(inserted);
            }
          });
      }
    });
  });

  // Send a "Scrape Complete" message to the browser
  res.send("Scrape Complete");
});
app.post("/submit", (req,res)=>{
  console.log(req.body);
  db.savedArticles.insert(req.body, function(err,saved){
    if(err){
      console.log(err);
    } else{
      res.send(saved);
    }
  })
})


app.listen(3000, function () {
  console.log("App running on port 3000!");
});