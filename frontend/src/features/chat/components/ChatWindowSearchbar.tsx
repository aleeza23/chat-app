import { FaceGrinning, SearchIcon, Send } from "lucide-react";

const ChatWindowSearchbar = () => {
	return (
		<div className="h-19 shrink-0 w-full left-0 bg-background rounded-[25px] flex items-center justify-between px-6 text-[#333333]">
			<div className="flex gap-4 items-center w-full mr-4">
				<SearchIcon size={32} />
				<input
					placeholder="Type your message here..."
					className="w-full bg-transparent border-0 outline-none text-xl font-light tracking-[0.4px] text-[#333333]"
				/>
			</div>
			<div className="flex items-center gap-4">
				<FaceGrinning size={32} />
				<button className="bg-primary rounded-lg cursor-pointer text-white px-2.5 h-12 flex justify-center items-center">
					<Send size={25} />
				</button>
			</div>
		</div>
	);
};

export default ChatWindowSearchbar;
