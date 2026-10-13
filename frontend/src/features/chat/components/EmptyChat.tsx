interface EmptyChatProps {
	onStart: () => void;
}

const EmptyChat = ({ onStart }: EmptyChatProps) => {
	return (
		<div className="h-full flex flex-col items-center justify-center text-center px-6">
			{/* icon */}
			<div className="size-28 rounded-full bg-primary/10 flex items-center justify-center mb-4">
				<svg
					width="52"
					height="52"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.8"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="text-primary"
				>
					<path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.2A8.4 8.4 0 0 1 3 11.5 8.5 8.5 0 0 1 12 3a8.5 8.5 0 0 1 9 8.5z" />
					<circle cx="8.5" cy="11.5" r=".6" fill="currentColor" />
					<circle cx="12" cy="11.5" r=".6" fill="currentColor" />
					<circle cx="15.5" cy="11.5" r=".6" fill="currentColor" />
				</svg>
			</div>

			<h3 className="font-bold text-2xl text-[#2b2b2b] mb-3">
				No messages yet
			</h3>

			<button
				type="button"
				onClick={onStart}
				className="bg-primary text-white font-medium text-lg px-10 py-3 rounded-xl hover:opacity-90 active:scale-95 transition-all duration-300 cursor-pointer"
			>
				Start chat
			</button>
		</div>
	);
};

export default EmptyChat;
