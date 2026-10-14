"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import ChatWindow from "@/features/chat/components/ChatWindow";
import Sidebar from "@/features/chat/components/Sidebar";
import UsersList from "@/features/chat/components/UsersList";
import { User } from "@/types";

const ChatPage = () => {
	const { user, loading } = useAuth();
	const router = useRouter();
	const [activeUser, setActiveUser] = useState<User | null>(null);

	useEffect(() => {
		if (!loading && !user) {
			router.replace("/login");
		}
	}, [user, loading, router]);

	if (loading || !user) return null;

	return (
		<div className="flex gap-10 h-dvh overflow-hidden p-11">
			<Sidebar />
			<div className="h-full min-h-0 max-w-132 w-full">
				<UsersList activeUser={activeUser} setActiveUser={setActiveUser} />
			</div>
			<main className="h-full min-h-0 min-w-0 flex-1">
				<ChatWindow activeUser={activeUser} />
			</main>
		</div>
	);
};

export default ChatPage;
