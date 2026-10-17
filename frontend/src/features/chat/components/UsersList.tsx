import Card from "@/components/Card";
import { User } from "@/types";
import { cn } from "cn";
import Image from "next/image";
import { ChatMessage, UnreadMessage } from "../types";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";
import { getUnreadMessagesCount } from "../services/message.service";
import { useSocket } from "@/context/socketContext";

const UsersList = ({
	activeUser,
	setActiveUser,
	chats,
	users,
	isChatsLoading,
}: {
	activeUser: User | null;
	setActiveUser: (user: User) => void;
	chats: ChatMessage[];
	users: User[];
	isChatsLoading: boolean;
}) => {
	const [unreadMessages, setUnreadMessages] = useState<UnreadMessage[]>([]);
	const { socket } = useSocket();

	const handleActiveUser = (user: User) => {
		setActiveUser(user);
		if (socket) {
			socket.emit("mark-read", user._id);
		}
	};

	useEffect(() => {
		const fetchUnreadMessages = async () => {
			const result = await getUnreadMessagesCount();
			setUnreadMessages(result.data);
			console.log(result);
		};

		fetchUnreadMessages();
	}, []);

	useEffect(() => {
		if (!socket) return;

		const handleReadMessages = (senderId: string) => {
			setUnreadMessages((prev) => prev.filter((msg) => msg._id !== senderId));
		};

		socket.on("messages-read", handleReadMessages);

		return () => {
			socket.off("messages-read", handleReadMessages);
		};
	}, [socket]);

	useEffect(() => {
		if (!socket) return;

		const handleNewMessage = (message: ChatMessage) => {
			const senderId =
				typeof message.sender === "string"
					? message.sender
					: message.sender._id;

			if (senderId === activeUser?._id) return;

			setUnreadMessages((prev) => {
				const existing = prev.find((msg) => msg._id === senderId);

				if (existing) {
					return prev.map((msg) =>
						msg._id === senderId
							? {
									...msg,
									unreadCount: msg.unreadCount + 1,
									lastMessage: message.message,
								}
							: msg,
					);
				}

				return [
					...prev,
					{ _id: senderId, unreadCount: 1, lastMessage: message.message },
				];
			});
		};

		socket.on("private-message", handleNewMessage);

		return () => {
			socket.off("private-message", handleNewMessage);
		};
	}, [socket, activeUser?._id]);

	console.log(activeUser?._id, "active user id");

	const getUnreadCount = (userId: string) =>
		unreadMessages.find((msg) => msg._id === userId)?.unreadCount ?? 0;

	const getLastMessage = (userId: string) =>
		unreadMessages.find((msg) => msg._id === userId)?.lastMessage ?? 0;

	return (
		<Card>
			<h2 className="font-bold text-2xl mb-6">People</h2>

			{isChatsLoading && <p className="text-center font-light">Loading...</p>}

			{/* user */}
			{users.length === 0 ? (
				<p className="text-center font-light">No user found</p>
			) : (
				users.map((user) => {
					const unreadCount = getUnreadCount(user._id);
					const lastMessage = getLastMessage(user._id);

					return (
						<div
							key={user._id}
							onClick={() => handleActiveUser(user)}
							className={cn(
								`${activeUser?._id === user._id && "bg-primary/5"} flex justify-between mb-1 border-b border-[#B4ABAB]/70 pb-5 hover:bg-primary/5 p-1.5 cursor-pointer rounded-t-xl transition-all duration-300`,
							)}
						>
							<div className="flex gap-7 items-center">
								<div className="relative shrink-0">
									<Image
										src={user.profileUrl ?? "/avatar.png"}
										width={50}
										height={50}
										alt="avatar"
										className="rounded-full"
									/>

									{/* status dot */}
									<span
										className={cn(
											"absolute bottom-0 right-0 size-3.5 rounded-full border-2 border-white",
											user.isOnline ? "bg-green-500" : "bg-orange-300",
										)}
									/>
								</div>
								<div>
									<h4 className="font-semibold text-xl">{user.username}</h4>
									<p className="font-light text-[#303030]">
										{chats.length !== 0
											? chats.at(-1)?.message
											: lastMessage
												? lastMessage
												: "Start chatting"}
									</p>
								</div>
							</div>

							<div>
								{/* <p className="font-light text-[#303030]">Today, 9.52pm</p> */}

								{unreadCount > 0 && (
									<div className="size-7 bg-[#F24E1E] ms-auto mt-1 rounded-full flex items-center justify-center text-white text-sm">
										{unreadCount > 99 ? "99+" : unreadCount}
									</div>
								)}
							</div>
						</div>
					);
				})
			)}
		</Card>
	);
};

export default UsersList;
