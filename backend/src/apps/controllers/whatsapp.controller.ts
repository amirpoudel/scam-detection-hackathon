
import asyncHandler from "../../lib/async/express.async";
import { Request, Response } from "express";

// import { replyChatWithSession } from "../services/chatbot.service";
// import { sendWhatsAppTextReply } from "../services/whatsapp.service";


export const verifyWhatsappWebhook = asyncHandler(async (req: Request, res: Response) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN) {
        console.log('Whatsapp Webhook Verified');
        return res.status(200).send(challenge);
    } else {
        console.log('Webhook Verification Failed');
        return res.sendStatus(403);
    }
});


export const whatsappWebhook = asyncHandler(async (req: Request, res: Response) => {
    const body = req.body;
    console.log("Whatsapp incomming body",body)
    if (body.object === 'whatsapp_business_account') {
        body.entry.forEach((entry: any) => {
            const webhookEvent = entry.changes[0].value;
            console.log(webhookEvent);
            console.log("Messages",webhookEvent.messages)

            
            if (webhookEvent.messages) {
                //handleMessage(senderPsid, webhookEvent.message);
                webhookEvent.messages.forEach(async(message: any) => {
                    console.log(message.text.body)
                    //text scam detection . if scam the reply to the chat with flag


                    
                    // const response = await sendWhatsAppTextReply(webhookEvent.metadata.phone_number_id,message.from,replyMessage)
                    // console.log("Whatsapp response", response)

                })
            } else if (webhookEvent.postback) {
                //handlePostback(senderPsid, webhookEvent.postback);
            }
        });

        res.status(200).send('EVENT_RECEIVED');
    } else {
        res.sendStatus(404);
    }
});