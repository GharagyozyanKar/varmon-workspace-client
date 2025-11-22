import axios, { type AxiosResponse } from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

export const handleRequest = async <T>(
  request: Promise<AxiosResponse<T>>
): Promise<T> => {
  const response = await request;
  return response.data;
};
