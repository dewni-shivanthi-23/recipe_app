import multer from "multer";
import path from "path";

// file storage
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/"); // save to uploads folder
  },
  filename(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// file filter
const fileFilter = (req, file, cb) => {
  const allowed = /jpg|jpeg|png/;
  const ext = allowed.test(path.extname(file.originalname).toLowerCase());
  const mime = allowed.test(file.mimetype);

  if (ext && mime) cb(null, true);
  else cb("Images only!", false);
};

const upload = multer({ storage, fileFilter });

export default upload;
