type MessageType = "received" | "sent";

interface MessageStyle {
	wrap: string;
	bubble: string;
	time: string;
}

const dot =
	"after:content-[''] after:absolute after:-bottom-1 after:w-[9px] after:h-[9px] after:rounded-full";

const styles: Record<MessageType, MessageStyle> = {
	received: {
		wrap: "items-start pl-[12px]",
		bubble: `bg-[#e8e8e8] text-[#333] ${dot} after:-left-[9px] after:bg-[#dcdcdc]`,
		time: "ml-[12px]",
	},
	sent: {
		wrap: "items-end pr-[12px]",
		bubble: `bg-primary text-white ${dot} after:-right-[12px] after:bg-primary`,
		time: "mr-[13px]",
	},
};

const Message = ({
	type,
	text,
	time,
	mt = 0,
}: {
	type: MessageType;
	text: string;
	time: string;
	mt?: number | string;
}) => {
	const s = styles[type];

	return (
		<div className={`flex flex-col ${s.wrap}`} style={{ marginTop: mt }}>
			<div
				className={`relative h-14.75 px-5 rounded-[25px] flex items-center whitespace-nowrap text-2xl font-normal tracking-[0.4px] [&+div]:mt-3 ${s.bubble}`}
			>
				{text}
			</div>
			<span className={`mt-2 font-light text-xl text-[#707070] ${s.time}`}>
				{time}
			</span>
		</div>
	);
};
export default Message;
