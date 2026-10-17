import { User } from "@/types";

export interface ChatMessage {
	_id: string;
	sender: User;
	receiver: User;
	message: string;
	createdAt: string;
}

export interface UnreadMessage {
	_id: string;
	unreadCount: number;
	lastMessage: string;
}
