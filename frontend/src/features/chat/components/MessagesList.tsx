import { User } from "@/types";
import Message from "./Message";
import { ChatMessage } from "../types";
import { useEffect, useRef } from "react";

interface MessagesListProps {
	chats: ChatMessage[];
	user: User | null;
	isLoading: boolean;
}

const MessagesList = ({ chats, user, isLoading }: MessagesListProps) => {
	const bottomRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [chats]);

	if (isLoading) {
		return <p className="text-center mt-10">Loading messages...</p>;
	}

	return (
		<section className="pt-6 overflow-y-auto min-h-0 pb-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
			{chats.map((chat) => (
				<Message
					key={chat._id}
					type={chat.sender._id === user?._id ? "sent" : "received"}
					text={chat.message}
					time={new Date(chat.createdAt).toLocaleTimeString([], {
						hour: "numeric",
						minute: "2-digit",
					})}
				/>
			))}
			<div ref={bottomRef} />
		</section>
	);
};

export default MessagesList;
