const express = require("express");
const router = express.Router();

require("dotenv").config();

const createDOMPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

const fs = require("fs");
const _ = require("lodash");

// let signingSecret = process.env.SLACK_SIGNING_SECRET;
// let token = process.env.SLACK_BOT_TOKEN;

//const confidentialAccount = { signingSecret, token };

/* GET users listing. */
router.post("/", function (req, res, next) {
  let dataReceived = JSON.stringify(req.body);

  let TextReceived = req.body.result;

  const cleanText = DOMPurify.sanitize(TextReceived, {
    ALLOWED_TAGS: [""],
  }).toLowerCase();

  let stringToArray = cleanText.split(" ");

  // Removing empty element
  let stringRemoveEmpty = stringToArray.filter(Boolean);

  // Create a new Array when each words are cleaned by Regex to remove non-character
  let stringRemoveNonCharacters = stringRemoveEmpty.map((eachString, index) => {
    let eachStringInMap = eachString.replace(/\W/g, "");
    return eachStringInMap;
  });
  //console.log(stringRemoveNonCharacters);

  function tranScripTion() {
    let ipaJSON = fs.readFileSync("./dictionary/eng_ipa.json");
    let ipaArrayOBject = JSON.parse(ipaJSON);

   //console.log(ipaArrayOBject);
   
    let stringIPAIndex = stringRemoveNonCharacters.map((eachString, index) => {
      //return eachString.toUpperCase();
      return _.findIndex(ipaArrayOBject, function(o) { return o.word == eachString; });
    });

    console.log(stringIPAIndex)

    // Remove unavailable word in the dictionary data as lodash return -1
    stringIPAIndex = stringIPAIndex.filter(index => index >=0);
    
    let finalIPA = stringIPAIndex.map((eachWord, index) =>{
      return ipaArrayOBject[eachWord].ipa;
    })
    return finalIPA;
  }

  let finalOutputIPA = tranScripTion().join(" ");
  
  res.send({ outPut: finalOutputIPA });
});

module.exports = router;
