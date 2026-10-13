"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import ChatWindow from "@/features/chat/components/ChatWindow";

const ChatPage = () => {
	const { user, loading } = useAuth();
	const router = useRouter();
	console.log(user);

	useEffect(() => {
		if (!loading && !user) {
			router.replace("/login");
		}
	}, [user, loading, router]);

	if (loading || !user) return null;

	return <ChatWindow />;
};

export default ChatPage;
