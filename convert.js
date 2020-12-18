"use strict";

const fs = require("fs");

const _ = require('lodash');


const getIPA = async (inputWord) => {

  inputWord = inputWord.toLowerCase();

  let individualWordsArray = inputWord.split(" ");

  fs.readFile("./dictionary/eng_ipa.json", (err, data) => {
    if (err) throw err;
    
    let ipaDataArray = JSON.parse(data);

    let IPAindexArray = [];
    
    for (let each of individualWordsArray){

      const wordWanted = _.findIndex(ipaDataArray, function(o) { return o.word == each; });

      IPAindexArray.push(ipaDataArray[wordWanted].ipa)
      
    }
        
    console.log(IPAindexArray.join(" "));

    //console.log(`IPA của ${inputWord} là: ` + ipaDataArray[wordWanted].ipa)
  
  });
};


getIPA("what the urban population could use is better trains");


let symbols = {
  a: "ə",
  ey: "eɪ",
  aa: "ɑ",
  ae: "æ",
  ah: "ə",
  ao: "ɔ",
  aw: "aʊ",
  ay: "aɪ",
  ch: "ʧ",
  dh: "ð",
  eh: "ɛ",
  er: "ər",
  hh: "h",
  ih: "ɪ",
  jh: "ʤ",
  ng: "ŋ",
  ow: "oʊ",
  oy: "ɔɪ",
  sh: "ʃ",
  th: "θ",
  uh: "ʊ",
  uw: "u",
  zh: "ʒ",
  iy: "i",
  y: "j",
};

//console.log(symbols);
