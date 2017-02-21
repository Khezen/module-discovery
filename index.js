"use strict";
const fs = require("fs");

function requireFailed(path){
  console.error("failed to require the following package: "+path);
}

function discovery(directory, callback){
  let _this = this;
  fs.readdirSync(directory).
  forEach((file) => {
    let path = directory + "/" + file;
    let inputStat = fs.lstatSync(path);
    if(inputStat.isDirectory()){
      discovery(path);
    }else{
      let discovered = null;
      try{
        discovered = require(path);
        if(!discovered){
          requireFailed(path);
        }
      }
      catch(e){
        requireFailed(path);
      }
      if(callback && discovered){
        callback.call(_this, discovered);
      }
    }
  });
}

module.exports = discovery;
