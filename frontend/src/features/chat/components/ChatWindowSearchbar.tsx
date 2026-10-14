import { useSocket } from "@/context/socketContext";
import { User } from "@/types";
import { FaceGrinning, SearchIcon, Send } from "lucide-react";
import { useState } from "react";

const ChatWindowSearchbar = ({ activeUser }: { activeUser: User | null }) => {
	const { socket } = useSocket();
	const [message, setMessage] = useState<string>("");

	const handleSend = () => {
		if (!socket || !activeUser) {
			console.warn(
				"Cannot send message: Socket disconnected or no active recipient selected.",
			);
			return;
		}

		socket.emit("private-message", {
			receiver: activeUser._id,
			message: message.trim(),
		});
		setMessage("");
	};

	return (
		<div className="h-19 shrink-0 w-full mt-auto left-0 bg-background rounded-[25px] flex items-center justify-between px-6 text-[#333333]">
			<div className="flex gap-4 items-center w-full mr-4">
				<SearchIcon size={32} />
				<input
					placeholder="Type your message here..."
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					className="w-full bg-transparent border-0 outline-none text-xl font-light tracking-[0.4px] text-[#333333]"
				/>
			</div>
			<div className="flex items-center gap-4">
				<FaceGrinning size={32} />
				<button
					disabled={message === ""}
					onClick={handleSend}
					className="bg-primary disabled:cursor-not-allowed disabled:opacity-50 rounded-lg cursor-pointer text-white px-2.5 h-12 flex justify-center items-center"
				>
					<Send size={25} />
				</button>
			</div>
		</div>
	);
};

export default ChatWindowSearchbar;
