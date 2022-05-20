const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db/db")

//Middleware
app.use(cors());
app.use(express.json());

// Routes
// Get all images
app.get("/imagerepo", async (req, res) => {
  try {
    const publicImages = await pool.query(
      `SELECT * FROM images WHERE public = t;`
    )
    if (req.body.user_id){
      const privateUserImages = await pool.query(
        `SELECT * FROM images WHERE user_id = $1 AND public = f;`, [req.body.user_id]
      )
    }
    // res.json(allImages.rows);
    // res.json(allImages.rows);
  } catch (err) {
    console.error(err.message)
  }
});


// Get single image 
app.get("/imagerepo/:id", async (req, res) => {
  try {
    const publicImage = await pool.query(
      `SELECT * FROM images WHERE id = $1 AND public = t;`, [req.params.id]
    )
    if (req.body.user_id){
      const privateUserImage = await pool.query(
        `SELECT * FROM images WHERE id=$1 and user_id = $2 AND public = f;`, [req.params.id, req.body.user_id]
      )
    }
    // res.json(image.rows);
  } catch (err) {
    console.error(err.message)
  }
});

// POST Add image
app.post("/imagerepo", async (req, res) => {
  try {
    const {user_id, title, url, tags, public} = req.body
    const newImage = await pool.query(
      "INSERT INTO images (user_id, title, url, tags, public) VALUES ($1, $2, $3, $4, $5) RETURNING *;",
      [user_id, title, url, tags, public]
    )
    res.json(newImage.rows);
  } catch (err) {
    console.error(err.message)
  }
});

// GET update image data and info
// POST change privacy status

app.listen(5000, () => {
  console.log("server is running on port 5000");
})