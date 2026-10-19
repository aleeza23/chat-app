import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
	// baseURL:
	// 	typeof window === "undefined"
	// 		? process.env.API_URL
	// 		: process.env.NEXT_PUBLIC_API_URL,

	baseURL: typeof window === "undefined" ? process.env.API_URL : "/api",

	timeout: 10000,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
	},
});

export default api;
