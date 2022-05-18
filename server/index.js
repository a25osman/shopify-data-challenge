const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db")

//Middleware
app.use(cors());
app.use(express.json());

// Routes
// Get all images

// Get single image 

// POST Add image
app.post("/imagerepo", async (req, res) => {
  try {
    res.json(req.body)
  } catch (err) {
    console.error(err.message)
  }
})

// POST change privacy status

app.listen(5000, () => {
  console.log("server is running on port 5000");
})