import express from 'express';
import Multer from 'multer';

import { BadRequestError } from '../../common';

// export function multerMiddleWare() {
//   const storage = multer.diskStorage({
//     destination: (req: express.Request, file: any, cb) => {
//       const { folderName = '' } = req.body;
//       console.log(file, req.body);

//       const pathDir = path.join('./public/data/uploads/', folderName);
//       fs.mkdirSync(pathDir, { recursive: true })
//       return cb(null, pathDir)
//     },
//     filename: function (_, file, callback) {
//       callback(null, Date.now() + file.originalname);
//     },
//   });

//   const imageFilter = function (_: express.Request, file: any, cb: any) {
//     // accept image files only
//     if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
//       return cb(new Error('Only image files are allowed!'), false);
//     }
//     cb(null, true);
//   };
//   const upload = multer({ storage, fileFilter: imageFilter });
//   return upload.array('files');
// }

export default (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const maximumFileSizeInMegabyte = process.env.MAXIMUM_UPLOAD_SIZE || "20";
  const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
      fileSize: parseInt(maximumFileSizeInMegabyte) * 1024 * 1024 // no larger than 5mb
    }
  });
  const single = multer.single("file");
  return single(req, res, function (error) {
    if (error) {
      if (error.code == "LIMIT_FILE_SIZE") {
        error = new BadRequestError(`File size must be smaller than ${maximumFileSizeInMegabyte}MB`);
      }
      next(error);
    } else {
      next();
    }
  });
};

// Define the Multer middleware function
// export const multerMiddleWare = (isSingle = false) => {
//   const storage = multer.diskStorage({
//     destination: (req: express.Request, _: any, cb) => {
//       const { folderName = '' } = req.body;
//       const path = `./public/data/uploads/${folderName}`
//       fs.mkdirSync(path, { recursive: true })
//       return cb(null, path)
//     },
//     filename: function (_, file, callback) {
//       callback(null, Date.now() + file.originalname);
//     },
//   });

//   const imageFilter = function (_: express.Request, file: any, cb: any) {
//     // accept image files only
//     if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
//       return cb(new Error('Only image files are allowed!'), false);
//     }
//     cb(null, true);
//   };

//   const upload = multer({ storage, fileFilter: imageFilter });
//   if (isSingle) {
//     return (req: express.Request, res: express.Response, next: express.NextFunction) => {
//       upload.single('file')(req, res, (err) => handleErrorUploadedFile(err, next));
//     };

//   }
//   return (req: express.Request, res: express.Response, next: express.NextFunction) => {
//     upload.array('files')(req, res, (err) => handleErrorUploadedFile(err, next));
//   };
// };

// function handleErrorUploadedFile(err: any, next: express.NextFunction) {
//   if (err) {
//     throw new BadRequestError('File upload failed');
//   }
//   next();
// }
