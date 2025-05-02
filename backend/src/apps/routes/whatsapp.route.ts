import { Router } from "express";

import * as whatsappController from "../controllers/whatsapp.controller"


const router = Router();

router.route("/webhook").get(whatsappController.verifyWhatsappWebhook).post(whatsappController.whatsappWebhook);

export default router;