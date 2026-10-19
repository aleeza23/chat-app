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
		<div className="bg-background mt-auto flex h-14 w-full shrink-0 items-center justify-between gap-2 rounded-[20px] px-3 text-[#333333] md:h-16 md:rounded-[25px] md:px-5 lg:h-19 lg:px-6">
			<div className="flex min-w-0 flex-1 items-center gap-2 md:gap-3 lg:gap-4">
				<SearchIcon className="hidden size-6 shrink-0 sm:block md:size-7 lg:size-8" />
				<input
					placeholder="Type your message here..."
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter" && !e.shiftKey) {
							e.preventDefault();
							handleSend();
						}
					}}
					// text-base (16px) on mobile stops iOS Safari from zooming on focus
					className="w-full min-w-0 border-0 bg-transparent text-base font-light tracking-[0.2px] text-[#333333] outline-none md:text-lg lg:text-xl lg:tracking-[0.4px]"
				/>
			</div>
 
			<div className="flex shrink-0 items-center gap-2 md:gap-3 lg:gap-4">
				<FaceGrinning className="size-6 md:size-7 lg:size-8" />
				<button
					type="button"
					aria-label="Send message"
					disabled={message.trim() === ""}
					onClick={handleSend}
					className="bg-primary flex h-10 cursor-pointer items-center justify-center rounded-lg px-2.5 text-white disabled:cursor-not-allowed disabled:opacity-50 md:h-11 lg:h-12"
				>
					<Send className="size-5 md:size-6 lg:size-6.25" />
				</button>
			</div>
		</div>
	);
};

export default ChatWindowSearchbar;
