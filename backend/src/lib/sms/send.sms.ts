import axios from 'axios';


export async function sendSMS(phoneNumber:string,message:string):Promise<void>{
    console.log(`Sending SMS to ${phoneNumber} with message ${message}`)
    const url= process.env.SMS_API;
    const sendApiUrl =  `${url}&contacts=${phoneNumber}&senderid=FSN_Alert&msg=${message}&responseType=json`;
    console.log("sendApiUrl",sendApiUrl);
    const response = await axios.post(sendApiUrl);
    console.log("response",response.data);
    return Promise.resolve();
}