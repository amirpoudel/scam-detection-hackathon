import axios from "axios";
export const sendWhatsAppTextReply = async (phoneNumberId:string,to: string, message: string) => {
    const url = `https://graph.facebook.com/v22.0/${phoneNumberId}/messages`; // Replace with your phone number ID
    const accessToken = process.env.WHATSAPP_ACCESS_TOKEN; // Replace with your actual token
  
    const payload = {
      messaging_product: 'whatsapp',
      to,
      type: 'text',
      text: {
        body: message
      }
    };
  
    try {
      const response = await axios.post(url, payload, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
  
      console.log('Message sent:', response.data);
      return response
    } catch (error: any) {
      console.error('Error sending message:', error.response?.data || error.message);
    }
  };