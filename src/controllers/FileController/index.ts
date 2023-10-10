import express from 'express';
import fs from 'fs';
import path from 'path';

import { BadRequestError, Controller, Middleware, POST } from '../../common';
import { Multer } from '../../middlewares';

@Controller('/files')
export class FileController {

  private _folderName = '';

  private readonly _folderPath = './public/data/uploads';

  @POST('/v1/upload')
  @Middleware(Multer)
  uploadFiles(req: express.Request) {
    const file = (req.file as Express.Multer.File);
    if (!file) {
      return { message: 'Files is empty for uploaded !' }
    }

    const { folderName = '' } = req.body;
    this._folderName = folderName;
    fs.mkdirSync(path.join(this._folderPath, this._folderName), { recursive: true });

    const fileDir = this._getFileDir(file.originalname);

    if (!this._validateFileExtension(file)) {
      return;
    }
    const writeStream = fs.createWriteStream(fileDir);

    writeStream.write(file.buffer, 'base64', (error) => {
      if (error) {
        console.error('Error writing to the file:', error);
        // Close the writable stream to finish writing
        writeStream.end();
        throw new Error(`Error writing image ${error.message} to the file.`);
      }
    });

    // Handle the 'finish' event for each stream
    writeStream.on('finish', () => {
      console.log(`Writing image ${fileDir} to the file is complete.`);
    });

    return {
      fileUrl: fileDir,
      fileName: file.originalname,
    }
  }

  private _validateFileExtension(file: Express.Multer.File) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
      throw new BadRequestError('Only image files are allowed!');
    }
    return true;
  }

  private _getFileDir(name: string) {
    return path.join(this._folderPath, this._folderName, this._getFileName(name));
  }

  private _getFileName(name: string) {
    return `${Date.now()}-${name}`;
  }
}