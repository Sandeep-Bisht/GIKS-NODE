const express = require('express');
const router = express.Router()
const CareerController = require('./CareerController');

const multer = require("multer");

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "--" + file.originalname);
    },
  });
  

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "application/pdf" ||
    file.mimetype === "text/plain" ||
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: fileStorageEngine, fileFilter: fileFilter });

router.post("/",upload.single("file"), CareerController.createApplicant)

module.exports = router;