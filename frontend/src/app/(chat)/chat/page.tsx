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
			const senderId = String(message.sender._id);
			const receiverId = String(message.receiver._id);
			const active = String(activeUser?._id);

			if (senderId === active || receiverId === active) {
				setChats((prev) => [...prev, message]);
			}

			if (receiverId === String(user?._id) && senderId === active) {
				socket.emit("mark-read", senderId);
			}
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

			setActiveUser((prev) =>
				prev && String(prev._id) === String(data.userId)
					? { ...prev, isOnline: data.isOnline, lastSeen: data.lastSeen }
					: prev,
			);
		};

		socket.on("user-status", handleUserStatus);

		return () => {
			socket.off("user-status", handleUserStatus);
		};
	}, [socket]);

	if (loading || !user) return null;

	const chatOpen = Boolean(activeUser);

	return (
		<div className="flex h-dvh flex-col overflow-hidden p-3 lg:flex-row md:gap-5 md:p-6 lg:gap-7 xl:gap-10 lg:p-11">
			<div
				className={`order-last shrink-0 pt-3 lg:order-0 md:pt-0 ${
					chatOpen ? "hidden md:block" : "block"
				}`}
			>
				<Sidebar />
			</div>

			<div
				className={`min-h-0 w-full flex-1 lg:block lg:flex-none lg:shrink-0 lg:max-w-80 xl:max-w-132 ${
					chatOpen ? "hidden" : "block"
				}`}
			>
				<div className="h-full min-h-0">
					<UsersList
						activeUser={activeUser}
						setActiveUser={setActiveUser}
						chats={chats}
						users={users}
						isChatsLoading={isChatsLoading}
					/>
				</div>
			</div>

			<main
				className={`h-full min-h-0 min-w-0 flex-1 flex-col lg:flex ${
					chatOpen ? "flex" : "hidden"
				}`}
			>
				{activeUser && (
					<button
						type="button"
						onClick={() => setActiveUser(null)}
						aria-label="Back to chats"
						className="mb-2 flex shrink-0 items-center gap-1 self-start rounded-lg px-2 py-1 text-sm font-medium lg:hidden"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="size-5"
						>
							<path d="m15 18-6-6 6-6" />
						</svg>
						Back
					</button>
				)}

				<div className="min-h-0 flex-1">
					<ChatWindow
						activeUser={activeUser}
						chats={chats}
						isLoading={isLoading}
					/>
				</div>
			</main>
		</div>
	);
};

export default ChatPage;
