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
	const { user } = useAuth();
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

		const handleMessage = (data: ChatMessage) => {
			const senderId = String(data.sender._id);
			const receiverId = String(data.receiver._id);

			if (receiverId !== String(user?._id)) return;
			if (senderId === String(activeUser?._id)) return;
			if (data.isRead) return;

			setUnreadMessages((prev) => {
				const existing = prev.some((u) => String(u._id) === senderId);

				if (!existing && !data.isRead) {
					return [
						...prev,
						{
							_id: senderId,
							lastMessage: data.message,
							unreadCount: 1,
						},
					];
				}

				return prev.map((u) => {
					if (String(u._id) === senderId && !data.isRead) {
						return {
							...u,
							lastMessage: data.message,
							unreadCount: u.unreadCount + 1,
						};
					}

					return u;
				});
			});
		};

		socket.on("private-message", handleMessage);

		return () => {
			socket.off("private-message", handleMessage);
		};
	}, [socket]);

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

	const getUnreadCount = (userId: string) =>
		unreadMessages.find((msg) => msg._id === userId)?.unreadCount ?? 0;

	const getLastMessage = (userId: string) =>
		unreadMessages.find((msg) => msg._id === userId)?.lastMessage ?? 0;

	return (
		<Card>
			<h2 className="font-bold text-2xl mb-6">People</h2>

			{isChatsLoading && <p className="text-center font-light">Loading...</p>}

			{/* user */}
			{!isChatsLoading && users.length === 0 ? (
				<p className="text-center font-light">No app user</p>
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
										{lastMessage ? lastMessage : "Start chatting"}
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
