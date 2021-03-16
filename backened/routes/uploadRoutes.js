import multer from "multer";
import path from "path";
import express from "express";

const router = express.Router();
const API = process.env.API;

console.log(API);

///   MULTER CONFIG.   ///

// storage of file
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "myuploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// check file type
const fileTypeCheck = (file, cb) => {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("only Images can be uploaded!");
  }
};

var upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    fileTypeCheck(file, cb);
  },
});

router.post("/", upload.single("image"), (req, res, next) => {
  res.status(200);
  res.send(`${API}/${req.file.path}`);
});

export default router;
