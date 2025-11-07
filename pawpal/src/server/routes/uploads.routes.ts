import { Router } from 'express';
import multer from 'multer';
import { uploadImage } from '../controllers/upload.controller';

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage,
	limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit (mirrors shared config)
});

// POST /api/uploads - upload image (protected by frontend or additional middleware)
router.post('/', upload.single('file'), uploadImage);

export default router;
