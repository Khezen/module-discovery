"use strict";
const fs = require("fs");

function discovery(directory, callback){

  const files = fs.readdirSync(directory);
  const len = files.length;
  let count = 0;
  let discoveries = [];

  function fileDone(resolve){
    count++;
    if(count === len){
      resolve(discoveries);
    }
  }
  function discoverDir(resolve, reject, path){
    discovery(path).
    then(function(newDiscoveries){
      discoveries = discoveries.concat(newDiscoveries);
      fileDone(resolve);
    }).
    catch(function(error){
      reject(error);
    });
  }

  function discoverFile(resolve, reject, path){
    let discovered = require(path);
    if(!discovered){
      reject(new Error("failed to require the following package: "+path));
    }else{
      discoveries.push(discovery);
      if(callback){
        callback.call(undefined, discovered);
      }
      fileDone(resolve);
    }
  }

  return new Promise( function(resolve, reject){
    files.forEach((file) => {
      let path = directory + "/" + file;
      let inputStat = fs.lstatSync(path);
      if(inputStat.isDirectory()){
        discoverDir(resolve, reject, path);
      }else{
        discoverFile(resolve, reject, path);
      }
    });
  });
}

module.exports = discovery;
