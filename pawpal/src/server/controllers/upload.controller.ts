import { Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import { config } from '../../shared/config/default';

// configure cloudinary from env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Uses multer to parse multipart/form-data (route handles that). Expects file buffer on req.file.buffer
export const uploadImage = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const file = req.file;
    if (!file) return res.status(400).json({ message: 'No file uploaded' });

    // Validate mimetype and size server-side
  const mimetype = (file as any).mimetype || '';
    if (config.allowedImageTypes.indexOf(mimetype) === -1) {
      return res.status(400).json({ message: 'Unsupported image type' });
    }

  const size = (file as any).size || (file.buffer && file.buffer.length) || 0;
    if (size > config.maxImageSize) {
      return res.status(400).json({ message: `Image too large. Max size is ${config.maxImageSize} bytes` });
    }

    const result = await new Promise<any>((resolve, reject) => {
      // Transformations: auto format/quality and limit width for optimization
      const stream = cloudinary.uploader.upload_stream({
        folder: 'pawpal',
        transformation: [
          { width: 1200, crop: 'limit' },
          { quality: 'auto' },
          { fetch_format: 'auto' }
        ]
      }, (error: any, result: any) => {
        if (error) return reject(error);
        resolve(result);
      });

      // @ts-ignore
      stream.end(file.buffer);
    });

    // Cloudinary returns a secure_url; we also expose a responsive-friendly srcset if needed
    res.status(201).json({ url: result.secure_url, public_id: result.public_id, width: result.width, height: result.height });
  } catch (error) {
    // Multer file size errors and Cloudinary errors can be surfaced here
    const err: any = error;
    const errMsg = err?.message || 'Upload failed';
    res.status(500).json({ message: errMsg, error: err });
  }
};

export default uploadImage;
