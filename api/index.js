const { storage } = require("./firebase.js");
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const router = express.Router();
const path = require("path");
const cors = require("cors");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const axios = require("axios");

dotenv.config();
app.use(express.json());

app.use(cors());

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.post("/api/upload", upload.single("file"), async (req, res) => {
  try {
    console.log("req body :", req.body);
    // Read the uploaded file
    if (!req.file || !req.body.name) {
      return res
        .status(400)
        .json({ error: "Missing file or name field in the request body" });
    }
    const fileContent = req.file.buffer;
    const fileName = req.body.name;
    //fileContent.filename = fileName;
    console.log(req.body);
    console.log("File name:", fileName);
    console.log("File content:", fileContent);
    console.log(req.body.name);

    const imageRef = ref(storage, `images/${fileName}`);

    await uploadBytes(imageRef, fileContent)
      .then(async (snapshot) => {
        // File uploaded successfully
        console.log("File uploaded successfully");
        // You can add any additional code you need here
        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log("Download URL:", downloadURL);
        res
          .status(200)
          .json({ message: "File uploaded successfully", downloadURL });
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        throw error; // Rethrow the error for handling in the calling code
      });
  } catch (error) {
    console.error("Error uploading file to firebase:", error);
    // Respond with error message
    res.status(500).json("Error uploading file to firebase");
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
