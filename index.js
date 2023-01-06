const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fb2rty6.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri);

app.get("/", (req, res) => {
  res.send({ status: true, message: "it's works" });
});
const serviceCollection = client.db("weddingService").collection("services");
function run() {
  client.connect();
  try {
    app.post("/addservice", async (req, res) => {
      const information = req.body;
      const result = await serviceCollection.insertOne(information);
      res.send(result);
    });


    
  } catch (e) {
    console.log(e.message, e.stack);
  }
}

run();
app.listen(port, () => {
  console.log(`simple node server running on port ${port}`);
});
