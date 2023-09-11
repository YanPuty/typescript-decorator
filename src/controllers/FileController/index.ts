import express from 'express';
import fs from 'fs';
import multer from 'multer';
import path from 'path';

import { BadRequestError, Controller, Middleware, POST } from '../../common';

@Controller('/files')
export class FileController {

  private _folderName = '';

  private readonly _folderPath = './public/data/uploads';

  @POST('/v1/batch/upload')
  @Middleware(multer().array('files'))
  uploadFiles(req: express.Request) {
    const files = (req.files as Express.Multer.File[]) ?? [];
    if (!files.length) {
      return { message: 'Files is empty for uploaded !' }
    }

    const { folderName = '' } = req.body;
    this._folderName = folderName;
    fs.mkdirSync(path.join(this._folderPath, this._folderName), { recursive: true });

    const fileUploaded = files.map((file: Express.Multer.File, index: number) => {
      try {
        const fileDir = this._getFileDir(file.originalname);

        if (!this._validateFileExtension(file)) {
          return;
        }
        const writeStream = fs.createWriteStream(fileDir);

        writeStream.write(file.buffer, 'base64', (error) => {
          if (error) {
            console.error('Error writing to the file:', error);
            // Close the writable stream to finish writing
            throw new Error(`Error writing image ${error.message} to the file.`);
          }
          writeStream.end();
        });

        // Handle the 'finish' event for each stream
        writeStream.on('finish', () => {
          console.log(`Writing image ${fileDir + 1} to the file is complete.`);
          if (index === files.length - 1) {
            // If it's the last image, send a response to the client
            return {
              fileUrl: fileDir,
              fileName: file.originalname,
            }
          }
        });

        return {
          fileUrl: fileDir,
          fileName: file.originalname,
        }
      } catch (error) {
        console.log(2222222222, error);

        throw new Error(`Error writing image ${error} to the file.`);
      }
    });
    return fileUploaded;
  }

  private _validateFileExtension(file: Express.Multer.File) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
      throw new BadRequestError('Only image files are allowed!');
      return false;
    }
    return true;
  }

  private _getFileDir(name: string) {
    return path.join('./public/data/uploadsasdasd', this._folderName, this._getFileName(name));
  }

  private _getFileName(name: string) {
    return Date.now() + name;
  }
}