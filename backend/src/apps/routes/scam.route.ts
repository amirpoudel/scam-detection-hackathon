import { Router } from "express";
import * as scamController from "../controllers/scam.controller";
import { upload } from "../middleware/multer.middleware";
const router = Router();

const uploadAudio = upload.single("audio");

router.route("/detect/link").post(scamController.linkDetection);
router.route("/detect/text").post(scamController.textDetection);
router.route("/detect/audio").post(uploadAudio,scamController.audioDetection);
router.route("/detect/audio/quick").post(uploadAudio, scamController.audioDetectionQuick);

export default router;