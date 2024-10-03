const express = require("express");
const app = express();
const port = 3000;
const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "Password_Manager";
const bodyparser = require('body-parser')
const cors = require('cors')
dotenv.config();
client.connect();

app.use(cors())
app.use(bodyparser.json())


// get all password
app.get("/", async function (req, res) {
  const db = client.db(dbName);
  const collection = db.collection("Password");
  const findResult = await collection.find({}).toArray();
  res.json(findResult);
});

//save password

app.post("/", async function (req, res) {
  const password = req.body
  const db = client.db(dbName);
  const collection = db.collection("Password");
  const findResult = await collection.insertOne(password);
  res.send({success:true , result : findResult });
});

//delete password by id 

app.delete("/", async function (req, res) {
  const password = req.body
  const db = client.db(dbName);
  const collection = db.collection("Password");
  const findResult = await collection.deleteOne(password);
  res.send({success:true , result : findResult });
});

app.listen(port, function () {
  console.log(`the server listen on http://localhost:${port}/`);
});
