import api from "@/lib/axios";

export const getChatMessages = async (senderId: string, receiverId: string) => {
	const response = await api.get(`/chats/${senderId}/${receiverId}`);
	return response.data;
};

export const getUnreadMessagesCount = async () => {
	const response = await api.get(`/chats`);
	return response.data;
};
