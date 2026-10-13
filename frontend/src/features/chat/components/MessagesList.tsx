import Message from "./Message";

const MessagesList = () => {
	return (
		<section className="pt-6 overflow-y-auto min-h-0 pb-20 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
			<Message
				type="received"
				texts={["Hey There!", "How are you?"]}
				time="Today, 8.30pm"
			/>
			<Message type="sent" texts={["Hello!"]} time="Today, 8.33pm" mt={21} />
			<Message
				type="sent"
				texts={["I am fine and how are you?"]}
				time="Today, 8.34pm"
				mt={20}
			/>
			<Message
				type="received"
				texts={["I am doing well, Can we meet tomorrow?"]}
				time="Today, 8.36pm"
				mt={32}
			/>
			<Message type="sent" texts={["Yes Sure!"]} time="Today, 8.58pm" mt={15} />
		</section>
	);
};

export default MessagesList;
