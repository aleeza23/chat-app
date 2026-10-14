import AuthProvider from "@/context/authContext";
import SocketProvider from "@/context/socketContext";
import React from "react";

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<AuthProvider>
			<SocketProvider>{children}</SocketProvider>
		</AuthProvider>
	);
};

export default ChatLayout;
