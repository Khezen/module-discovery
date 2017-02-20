[![NPM Version](http://img.shields.io/npm/v/module-discovery.svg?style=flat)](https://www.npmjs.org/package/module-discovery)
[![NPM Downloads](https://img.shields.io/npm/dm/module-discovery.svg?style=flat)](https://www.npmjs.org/package/module-discovery)

# module-discovery
Requires node modules recursively from a root directory and execute callback.

# Usage

`npm install --save module-discovery`


mongoose example
```
const mongoose = require("mongoose");
const mdiscover = require("module-discovery");

mongoose.connect("mongodb://localhost:27017/example");

mongoose.connection.once("open", function(){
  mdiscover(__dirname + "/model", (model) => {
    mongoose.model(model.name, model.schema);
  });
});
```
