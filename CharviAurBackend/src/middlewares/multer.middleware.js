import multer from "multer";
import fs from "fs";
import path from "path";

const uploadDirectory = path.resolve("public/temp");
fs.mkdirSync(uploadDirectory, { recursive: true });

const imageOnly = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
    return;
  }

  cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE", file.fieldname));
};

const videoOrImage = (req, file, cb) => {
  if (file.mimetype.startsWith("image/") || file.mimetype.startsWith("video/")) {
    cb(null, true);
    return;
  }

  cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE", file.fieldname));
};

const maxVideoSizeInMb = Math.min(
  Math.max(Number(process.env.MAX_VIDEO_UPLOAD_SIZE_MB) || 500, 1),
  2000
);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirectory);
  },

  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: imageOnly,
});

export const videoUpload = multer({
  storage,
  limits: {
    fileSize: maxVideoSizeInMb * 1024 * 1024,
  },
  fileFilter: videoOrImage,
});
