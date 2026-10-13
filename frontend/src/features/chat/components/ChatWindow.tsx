"use client";

import { useState } from "react";
import Card from "@/components/Card";
import ChatWindowSearchbar from "./ChatWindowSearchbar";
import MessagesList from "./MessagesList";
import ChatWindowHeader from "./ChatWindowHeader";
import EmptyChat from "./EmptyChat";

const ChatWindow = () => {
	const [chatStarted, setChatStarted] = useState(false);

	return (
		<Card className="relative h-full min-h-0 flex flex-col overflow-hidden">
			{chatStarted ? (
				<>
					<ChatWindowHeader />
					<MessagesList />
					<ChatWindowSearchbar />
				</>
			) : (
				<EmptyChat onStart={() => setChatStarted(true)} />
			)}
		</Card>
	);
};

export default ChatWindow;
