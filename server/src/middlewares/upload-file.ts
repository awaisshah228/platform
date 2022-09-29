import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import { S3Client } from "@aws-sdk/client-s3";
import crypto from "crypto";

// const s3 = new aws.S3({
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRECT_ACCESS_KEY,
//   });
const s3 = new S3Client({
  region: 'ap-south-1',
  credentials: {
    accessKeyId: `${process.env.AWS_ACCESS_KEY_ID}`,
    secretAccessKey: `${process.env.AWS_SECRECT_ACCESS_KEY}`,
  },
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "blog-profile",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      let extArray = file.mimetype.split("/");
      let extension = extArray[extArray.length - 1];
      cb(null, file.fieldname + '-' + Date.now()+crypto.randomBytes(8).toString('hex')+ '.' +extension)
    },
  }),
});
export default upload;

// const uploadFile=()=>{

// }