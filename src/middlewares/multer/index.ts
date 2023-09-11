import express from 'express';
import fs from 'fs';
import multer from 'multer';
import path from 'path';

export function multerMiddleWare() {
  const storage = multer.diskStorage({
    destination: (req: express.Request, file: any, cb) => {
      const { folderName = '' } = req.body;
      console.log(file, req.body);

      const pathDir = path.join('./public/data/uploads/', folderName);
      fs.mkdirSync(pathDir, { recursive: true })
      return cb(null, pathDir)
    },
    filename: function (_, file, callback) {
      callback(null, Date.now() + file.originalname);
    },
  });

  const imageFilter = function (_: express.Request, file: any, cb: any) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  };
  const upload = multer({ storage, fileFilter: imageFilter });
  return upload.array('files');
}

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
