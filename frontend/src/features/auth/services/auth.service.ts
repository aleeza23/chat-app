import api from "@/lib/axios";
import { Login, Signup } from "../types";

export const signup = async (data: Signup) => {
	const response = await api.post("/register", data);
	return response.data;
};

export const login = async (data: Login) => {
	const response = await api.post("/login", data);
	return response.data;
};

export const getCurrentUser = async () => {
	const response = await api.get("/me");
	return response.data;
};

export const getAllUsers = async () => {
	const response = await api.get("/users");
	return response.data;
};
