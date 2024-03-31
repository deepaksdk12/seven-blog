const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const router = express.Router();
const path = require("path");
const cors = require("cors");
const { Dropbox } = require("dropbox");

dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use(cors());

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const dbx = new Dropbox({ accessToken: process.env.DROPBOX_ACCESS });
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/*const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});
*/

app.post("/api/upload", upload.single("file"), async (req, res) => {
  try {
    // Read the uploaded file
    const fileContent = fs.readFileSync(req.file.path);

    // Upload file to Dropbox
    const response = await dbx.filesUpload({
      path: "/uploads/" + req.file.filename,
      contents: fileContent,
    });

    console.log("File uploaded successfully:", response);

    // Respond with success message
    res.status(200).json("File has been uploaded to Dropbox");
  } catch (error) {
    console.error("Error uploading file to Dropbox:", error);
    // Respond with error message
    res.status(500).json("Error uploading file to Dropbox");
  }
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = router;
