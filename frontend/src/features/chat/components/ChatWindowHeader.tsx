import { PhoneIcon, VideoIcon } from "lucide-react";
import Image from "next/image";
import { ChatMessage } from "../types";
import { User } from "@/types";
import { cn } from "cn";

const ChatWindowHeader = ({ activeUser }: { activeUser: User }) => {
	return (
		<header className="h-17.75 shrink-0 border-b border-[#B4ABAB]/70 flex items-start">
			<div className="flex gap-7 items-center">
				<div className="relative shrink-0">
					<Image
						src={activeUser.profileUrl ?? "/avatar.png"}
						width={50}
						height={50}
						alt="avatar"
						className="rounded-full"
					/>

					{/* status dot */}
					<span
						className={cn(
							"absolute bottom-0 right-0 size-3.5 rounded-full border-2 border-white",
							activeUser.isOnline ? "bg-green-500" : "bg-orange-300",
						)}
					/>
				</div>

				<div>
					<h4 className="font-semibold text-xl">{activeUser.username}</h4>
					<p className="font-light text-[#303030]">
						{activeUser.isOnline ? "Online" : "Offline"}
						{!activeUser.isOnline &&
							activeUser.lastSeen &&
							`- Last seen ${new Date(activeUser.lastSeen).toLocaleTimeString([], { timeStyle: "short" })}`}{" "}
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
