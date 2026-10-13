import AuthProvider from "@/context/authContext";
import Sidebar from "@/features/chat/components/Sidebar";
import UsersList from "@/features/chat/components/UsersList";
import React from "react";

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<AuthProvider>
			<div className="flex gap-10 h-dvh overflow-hidden p-11">
				<Sidebar />
				<div className="h-full min-h-0 max-w-132 w-full">
					<UsersList />
				</div>
				<main className="h-full min-h-0 min-w-0 flex-1">{children}</main>
			</div>
		</AuthProvider>
	);
};

export default ChatLayout;
