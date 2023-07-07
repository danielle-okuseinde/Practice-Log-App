import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

//Getting a list of all the records
router.get("/", async (req, res) => {
  let collection = await db.collection("records");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

//get a single record by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("records");
  let query = { id: req.body.id };
  let result = await collection.find(query);

  if (!result) res.send("Not Found").status(404);
  else res.send(result).status(200);
});

//Creating a new record
router.post("/add", async (req, res) => {
  let collection = await db.collection("records");
  let result = await collection.insertOne(req.body);
  res.send(result).status(204);
});

//update a record by id
router.patch("/update", async (req, res) => {
  const query = { _id: new ObjectId(req.body._id) };
  let collection = await db.collection("records");
  const updates = {
    $set: {
      title: req.body.title,
      body: req.body.body,
      lastModified: req.body.lastModified,
      time: req.body.time,
      recording: req.body.recording,
    },
  };

  let result = await collection.updateOne(query, updates);

  res.send(result).status(200);
});

router.delete("/delete", async (req, res) => {
  const query = { _id: new ObjectId(req.body._id) };
  console.log("saved");
  const collection = db.collection("records");
  let result = await collection.deleteMany(query);
  res.send(result).status(200);
});

export default router;
