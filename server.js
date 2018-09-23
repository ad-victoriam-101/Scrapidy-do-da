// start of Dependencies.
const express = require("express");
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
    res.send(index.html);
});