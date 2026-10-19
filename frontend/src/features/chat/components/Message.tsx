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
				className={`relative flex min-h-11 max-w-[85%] items-center break-all rounded-[20px] px-4 py-2 text-base font-normal tracking-[0.2px]  md:min-h-13 md:max-w-[75%] md:rounded-[25px] md:px-5 md:text-xl md:tracking-[0.3px] lg:min-h-14.75 lg:max-w-[65%] lg:text-2xl lg:tracking-[0.4px] ${s.bubble}`}
			>
				{text}
			</div>
			<span
				className={`mt-1.5 text-xs font-light text-[#707070] md:mt-2 md:text-base lg:text-xl ${s.time}`}
			>
				{time}
			</span>
		</div>
	);
};
export default Message;
