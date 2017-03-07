[![NPM Version](http://img.shields.io/npm/v/module-discovery.svg?style=flat)](https://www.npmjs.org/package/module-discovery)

# module-discovery
Requires node modules recursively from a root directory and execute callback.

# Usage

`npm install --save module-discovery`

mongoose example

```
const mongoose = require("mongoose");
const mdiscover = require("module-discovery");

mongoose.connect("mongodb://localhost:27017/example");

mongoose.connection.once("open", () => {
  mdiscover(__dirname + "/colelctions", (collection) => {
    mongoose.model(collection.name, collection.schema);
  });
});
```

mongoose + graphql example

```
const express = require("express");
const mongoose = require("mongoose");
const mdiscover = require("module-discovery");
const graphqlHTTP = require('express-graphql');
const graffiti = require("@risingstack/graffiti-mongoose");

const api = express();

mongoose.connect("mongodb://localhost:27017/example");

mongoose.connection.once("open", () => {
  let models = [];
  mdiscover(__dirname + "/colelctions", (collection) => {
    models.push(mongoose.model(collection.name, collection.schema));
  }).
  then((modules) => {
    api.use("/graphql", graphqlHTTP({
      schema: graffiti.getSchema(models),
      graphiql: true
    }));
  });
});
```
