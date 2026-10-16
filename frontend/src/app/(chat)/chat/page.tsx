"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import ChatWindow from "@/features/chat/components/ChatWindow";
import Sidebar from "@/features/chat/components/Sidebar";
import UsersList from "@/features/chat/components/UsersList";
import { User } from "@/types";
import { ChatMessage } from "@/features/chat/types";
import { getChatMessages } from "@/features/chat/services/message.service";
import { useSocket } from "@/context/socketContext";

const ChatPage = () => {
	const { user, loading } = useAuth();
	const router = useRouter();
	const [activeUser, setActiveUser] = useState<User | null>(null);
	const [chats, setChats] = useState<ChatMessage[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { socket } = useSocket();

	useEffect(() => {
		if (!loading && !user) {
			router.replace("/login");
		}
	}, [user, loading, router]);

	useEffect(() => {
		if (loading || !user || !activeUser) return;

		const getChats = async () => {
			setIsLoading(true);
			try {
				const result = await getChatMessages(user._id, activeUser._id);
				setChats(result.data);
			} catch (error) {
				console.log("Error fetching chat messages", error);
			} finally {
				setIsLoading(false);
			}
		};

		getChats();
	}, [loading, user?._id, activeUser?._id]);

	//get recent sent messages from socket
	useEffect(() => {
		if (!socket) return;

		const handlePrivateMessages = (message: ChatMessage) => {
			setChats((prev) => [...prev, message]);
		};
		socket.on("private-message", handlePrivateMessages);

		return () => {
			socket.off("private-message", handlePrivateMessages);
		};
	}, [socket, user?._id, activeUser?._id]);

	if (loading || !user) return null;

	return (
		<div className="flex gap-10 h-dvh overflow-hidden p-11">
			<Sidebar />
			<div className="h-full min-h-0 max-w-132 w-full">
				<UsersList
					activeUser={activeUser}
					setActiveUser={setActiveUser}
					chats={chats}
				/>
			</div>
			<main className="h-full min-h-0 min-w-0 flex-1">
				<ChatWindow
					activeUser={activeUser}
					chats={chats}
					isLoading={isLoading}
				/>
			</main>
		</div>
	);
};

export default ChatPage;
