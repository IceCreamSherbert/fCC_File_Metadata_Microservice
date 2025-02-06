// Console log colors, (pretty :D)
const greenLog = "\x1b[32m%s\x1b[0m";
const redLog = "\x1b[31m%s\x1b[0m";

// Import libraries
const express = require("express");
const cors = require("cors");
const multer  = require("multer");
const upload = multer({ dest: "uploads/" });
require("dotenv").config();
const app = express();

// --Middleware--
// Run fCC tests
app.use(cors());

// Serve static css file from public directory
app.use("/public", express.static(process.cwd() + "/public"));

// --Endpoint Routes--
// Serve html file
app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
})

// File upload API
app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  //console.log(req.file);
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  })
})

// Download hello world txt file
app.get("/api/hello", (req, res) => {
  const filePath = __dirname + "/uploads/hello";
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('Error sending file:', err);
            res.status(500).send('Error sending file');
        }
    })
})

// --Port--
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(greenLog, "Your app is listening on port " + listener.address().port);
})
