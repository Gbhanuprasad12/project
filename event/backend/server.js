const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const cors = require("cors");
const schema = require("./graphql/schema");
const multer = require('multer');
const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

mongoose.connect("mongodb://localhost:27017/hospital_management", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => {
  console.error("MongoDB connection error:", err.message);
 
});

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

// File Upload Endpoint
app.post('/uploadcertificate', upload.single('certificate'), (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded.");
  res.status(200).json({ filePath: `/uploads/${req.file.filename}` });
});
// GraphQL Endpoint
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

const PORT =  4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
