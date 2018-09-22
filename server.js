// start of Dependencies.
const express = require("express");
const mongojs = require("mongojs");
const request = require("request");
const cheerio = require("cheerio");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// End of Dependencies.

var app = express();

var dataBaseUrl = "WebScrape_db";
var collections = ["WebScrapeData"];
