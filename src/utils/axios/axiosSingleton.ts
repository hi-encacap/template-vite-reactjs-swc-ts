import axios, { AxiosInstance } from "axios";

class AxiosSingleton {
  private static instance: AxiosInstance;

  public static getInstance(): AxiosInstance {
    if (!AxiosSingleton.instance) {
      AxiosSingleton.instance = AxiosSingleton.createInstance();
    }

    return AxiosSingleton.instance;
  }

  public static createInstance(): AxiosInstance {
    return axios.create({
      baseURL: import.meta.env.VITE_APP_API_BASE_URL as string,
      timeout: 30000,
      responseEncoding: "utf8",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export default AxiosSingleton;
