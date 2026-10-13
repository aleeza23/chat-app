import { PhoneIcon, VideoIcon } from "lucide-react";
import Image from "next/image";

const ChatWindowHeader = () => {
	return (
		<header className="h-17.75 shrink-0 border-b border-[#B4ABAB]/70 flex items-start">
			<div className="flex gap-7 items-center">
				<Image
					src={"/avatar.png"}
					width={50}
					height={50}
					alt="avatar"
					className="flex shrink-0"
				/>
				<div>
					<h4 className="font-semibold text-xl">Aleeza</h4>
					<p className="font-light text-[#303030]">
						Online - Last seen, 2.02pm
					</p>
				</div>
			</div>

			<div className="ml-auto flex items-center gap-8 text-primary">
				<PhoneIcon size={32} />
				<VideoIcon size={32} />
			</div>
		</header>
	);
};

export default ChatWindowHeader;
