import { PhoneIcon, VideoIcon } from "lucide-react";
import Image from "next/image";
import { ChatMessage } from "../types";
import { User } from "@/types";
import { cn } from "cn";

const ChatWindowHeader = ({ activeUser }: { activeUser: User }) => {
	return (
		<header className="flex h-16 shrink-0 items-center gap-3 border-b border-[#B4ABAB]/70 pb-2 md:h-17.75 md:items-start md:pb-0">
			<div className="flex min-w-0 items-center gap-3 md:gap-5 lg:gap-7">
				<div className="relative shrink-0">
					<Image
						src={activeUser.profileUrl ?? "/avatar.png"}
						width={50}
						height={50}
						alt="avatar"
						className="size-10 rounded-full object-cover md:size-12.5"
					/>

					{/* status dot */}
					<span
						className={cn(
							"absolute right-0 bottom-0 size-3 rounded-full border-2 border-white md:size-3.5",
							activeUser.isOnline ? "bg-green-500" : "bg-orange-300",
						)}
					/>
				</div>

				<div className="min-w-0">
					<h4 className="truncate text-base font-semibold md:text-lg lg:text-xl">
						{activeUser.username}
					</h4>
					<p className="truncate text-xs font-light text-[#303030] md:text-sm lg:text-base">
						{activeUser.isOnline ? "Online" : "Offline"}
						{!activeUser.isOnline &&
							activeUser.lastSeen &&
							` - Last seen ${new Date(activeUser.lastSeen).toLocaleTimeString([], { timeStyle: "short" })}`}
					</p>
				</div>
			</div>

			<div className="text-primary ml-auto flex shrink-0 items-center gap-4 md:gap-6 lg:gap-8">
				<button type="button" aria-label="Voice call">
					<PhoneIcon className="size-6 md:size-7 lg:size-8" />
				</button>
				<button type="button" aria-label="Video call">
					<VideoIcon className="size-6 md:size-7 lg:size-8" />
				</button>
			</div>
		</header>
	);
};

export default ChatWindowHeader;