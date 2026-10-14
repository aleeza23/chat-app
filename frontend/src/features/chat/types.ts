import { User } from "@/types";

export interface ChatMessage {
	_id: string;
	sender: User;
	receiver: User;
	message: string;
	createdAt: string;
}
