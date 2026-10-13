"use client";
import { getCurrentUser } from "@/features/auth/services/auth.service";
import { User } from "@/types";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextTypes {
	user: User | null;
	loading: boolean;
}

const AuthContext = createContext<AuthContextTypes | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	const getUser = async () => {
		try {
			const result = await getCurrentUser();
			setUser(result.data);
		} catch (error) {
			console.log(error);
			setUser(null);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getUser();
	}, []);

	return <AuthContext value={{ user, loading }}>{children}</AuthContext>;
};

export default AuthProvider;

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("No context provided");
	}

	return context;
};
