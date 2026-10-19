import Card from "@/components/Card";
import ChatWindowSearchbar from "./ChatWindowSearchbar";
import MessagesList from "./MessagesList";
import ChatWindowHeader from "./ChatWindowHeader";
import EmptyChat from "./EmptyChat";
import { User } from "@/types";
import { ChatMessage } from "../types";
import { useAuth } from "@/context/authContext";

const ChatWindow = ({
	activeUser,
	chats,
	isLoading,
}: {
	activeUser: User | null;
	chats: ChatMessage[];
	isLoading: boolean;
}) => {
	const {  user } = useAuth();

	return (
		<Card className="relative h-full min-h-0 flex flex-col overflow-hidden">
			{activeUser ? (
				<>
					<ChatWindowHeader activeUser={activeUser}  />
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
