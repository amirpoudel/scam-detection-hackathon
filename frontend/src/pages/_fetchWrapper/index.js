import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://some-domain.com/api/",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});

export const post = (url, data) => {
  try {
    const response = axiosInstance.post(url, data);
    return response;
  } catch (error) {
    console.log("error on post", error);
  }
};
