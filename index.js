"use strict";
const fs = require("fs");

function discovery(directory, callback){
  let _this = this;
  fs.readdirSync(directory).
  forEach((file) => {
    let path = directory + "/" + file;
    let inputStat = fs.lstatSync(path);
    if(inputStat.isDirectory()){
      discovery(path);
    }else{
      try{
        var discovered = require(path);
        if(callback){
          callback.call(_this, discovered);
        }
      }
      catch(e){
        console.err("failed to require the following package: "+path);
      }
    }
  });
}

module.exports = discovery;
