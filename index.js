"use strict";
const fs = require("fs");

function discovery(directory, callback){
  fails = [];
  let _this = this;
  fs.readdirSync(directory).
  forEach((file) => {
    let path = directory + "/" + file;
    let inputStat = fs.lstatSync(path);
    if(inputStat.isDirectory()){
      discovery(path);
    }else{
      let discovered = require(path);
      if(!discovered){
        throw new Error("failed to require the following package: "+path);
      }
      if(callback && discovered){
        callback.call(_this, discovered);
      }
    }
  });
}

module.exports = discovery;
