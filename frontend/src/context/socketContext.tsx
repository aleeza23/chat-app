"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { io, type Socket } from "socket.io-client";
import { useAuth } from "./authContext";

interface SocketContextType {
	socket: Socket | null;
}
const SocketContext = createContext<SocketContextType | null>(null);

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
	const [socket, setSocket] = useState<Socket | null>(null);
	const { user, loading } = useAuth();

	useEffect(() => {
		if (loading || !user?._id) return;

		//link server
		const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_SERVER_URL, {
			autoConnect: true,
		});

		//build connection
		socketInstance.on("connect", () => {
			socketInstance.emit("login", user._id);
		});

		setSocket(socketInstance);

		return () => {
			socketInstance.disconnect();
		};
	}, [user?._id, loading]);

	return (
		<SocketContext.Provider value={{ socket }}>
			{children}
		</SocketContext.Provider>
	);
};

export default SocketProvider;

export const useSocket = () => {
	const context = useContext(SocketContext);
	if (!context) {
		throw new Error("No context provided");
	}

	return context;
};
