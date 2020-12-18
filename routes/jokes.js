"use strict";
var express = require("express");
var router = express.Router();

const exphbs=require('handlebars');


const fs = require("fs");
const _ = require("lodash");

// fs.readFile("./dictionary/jokes.json", (err, data) => {
//   if (err) throw err;

//   let jokes = JSON.parse(data);

//   console.log(jokes);
// });

let jsonJokes = fs.readFileSync("./dictionary/jokes.json");

let objectJokes = JSON.parse(jsonJokes);

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


router.get("/", function (req, res, next) {
  let randomNumber = getRandomInt(386);

  let randomJoke = objectJokes[randomNumber];
  
  res.send(randomJoke);

  //res.render('index', { randomJoke });
});

module.exports = router;
