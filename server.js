const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

app.post("/upload", upload.array("images", 5), (req, res) => {

  const imageUrls = req.files.map(file =>
    `http://localhost:5000/uploads/${file.filename}`
  );

  res.json({
    message: "Images uploaded successfully",
    imageUrls
  });

});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});