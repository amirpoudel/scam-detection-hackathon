
import asyncHandler from "../../lib/async/express.async";
import { Request, Response } from "express";
import { TextPhishingDetector } from "../services/scamTextDetection.service";
import { sendWhatsAppTextReply } from "../services/whatsapp.service";

// import { replyChatWithSession } from "../services/chatbot.service";
// import { sendWhatsAppTextReply } from "../services/whatsapp.service";

const textDetector = new TextPhishingDetector(process.env.OPENAI_API_KEY!, "gpt-4", 0.2)


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

                    const response = await textDetector.analyzeMessage(message.text.body)
                    console.log("Response",response);
                    if(response.isSafe) {
                        return;
                    }
                    const replyMessage = `*Scam Detected*\n\n${message.text.body}\n\n*Flagged Reason*: ${response.explanation}\n\n*Recommendation*: ${response.safetyRecommendation}`
                    console.log("Reply message",replyMessage)
                    
                    const messageResponse = await sendWhatsAppTextReply(webhookEvent.metadata.phone_number_id,message.from,replyMessage)
                    console.log("Whatsapp response", messageResponse)

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