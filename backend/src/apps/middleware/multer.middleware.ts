import multer from 'multer';
import fs from 'fs';

// Generate unique file names for audio uploads
function generateUniqueFileName(req: any, file: any, cb: Function) {
    const timestamp = Date.now();
    const fileExtension = file.originalname.split('.').pop();
    const uniqueFileName = `audio-file-${timestamp}.${fileExtension}`;
    cb(null, uniqueFileName);
}

// Allow only specific audio MIME types
const fileFilter = function (req: any, file: any, cb: Function) {
    const allowedMimeTypes = [
        'audio/mpeg',    // .mp3
        'audio/wav',     // .wav
        'audio/x-wav',
        'audio/mp4',     // .m4a
        'audio/ogg',     // .ogg
        'audio/aac',     // .aac
        'audio/flac',    // .flac
        'audio/x-aac'
    ];
    console.log("File MIME Type:", file.mimetype); // Debugging line
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only audio files are allowed!'), false);
    }
};

// Define storage destination and filename
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const destinationPath = "./public/storage/audio";
        if (!fs.existsSync(destinationPath)) {
            fs.mkdirSync(destinationPath, { recursive: true });
        }
        cb(null, destinationPath);
    },
    filename: generateUniqueFileName,
});

// Export configured multer instance
export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 50, // 50MB
    },
});
