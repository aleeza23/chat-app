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
import { getAllUsers } from "@/features/auth/services/auth.service";

const ChatPage = () => {
	const { user, loading } = useAuth();
	const router = useRouter();
	const [activeUser, setActiveUser] = useState<User | null>(null);
	const [chats, setChats] = useState<ChatMessage[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [users, setUsers] = useState<User[]>([]);
	const [isChatsLoading, setIsChatsLoading] = useState<boolean>(true);

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

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const result = await getAllUsers();
				setUsers(result.data);
			} catch (error) {
				console.log(error);
			} finally {
				setIsChatsLoading(false);
			}
		};

		fetchUsers();
	}, []);

	useEffect(() => {
		if (!socket) return;

		const handleUserStatus = (data: {
			userId: String;
			isOnline: boolean;
			lastSeen: Date;
		}) => {
			setUsers((prevUsers) =>
				prevUsers.map((user) =>
					String(user._id) === data.userId
						? {
								...user,
								isOnline: data.isOnline,
								lastSeen: data.lastSeen,
							}
						: user,
				),
			);
		};

		socket.on("user-status", handleUserStatus);

		return () => {
			socket.off("user-status", handleUserStatus);
		};
	}, [socket]);

	if (loading || !user) return null;

	return (
		<div className="flex gap-10 h-dvh overflow-hidden p-11">
			<Sidebar />
			<div className="h-full min-h-0 max-w-132 w-full">
				<UsersList
					activeUser={activeUser}
					setActiveUser={setActiveUser}
					chats={chats}
					users={users}
					isChatsLoading={isChatsLoading}
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
