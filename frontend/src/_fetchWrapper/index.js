import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://amazed-polliwog-solely.ngrok-free.app/api/v1/",
  timeout: 500000,
});

export const post = async (
  url,
  data,
  headers = { "Content-Type": "application/json" }
) => {
  try {
    const response = await axiosInstance.post(url, data, {
      headers,
    });
    return response?.data;
  } catch (error) {
    console.log("error on post", error);
  }
};
