"use client";

import { useEffect, useState } from "react";
import Card from "@/components/Card";
import ChatWindowSearchbar from "./ChatWindowSearchbar";
import MessagesList from "./MessagesList";
import ChatWindowHeader from "./ChatWindowHeader";
import EmptyChat from "./EmptyChat";
import { User } from "@/types";
import { ChatMessage } from "../types";
import { getChatMessages } from "../services/message.service";
import { useAuth } from "@/context/authContext";

const ChatWindow = ({ activeUser }: { activeUser: User | null }) => {
	const { loading, user } = useAuth();
	const [chats, setChats] = useState<ChatMessage[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

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


	return (
		<Card className="relative h-full min-h-0 flex flex-col overflow-hidden">
			{activeUser ? (
				<>
					<ChatWindowHeader activeUser={activeUser} />
					<MessagesList chats={chats} user={user} isLoading={isLoading} />
					<ChatWindowSearchbar activeUser={activeUser} />
				</>
			) : (
				<EmptyChat />
			)}
		</Card>
	);
};

export default ChatWindow;
