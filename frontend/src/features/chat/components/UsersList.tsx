import Card from "@/components/Card";
import { getAllUsers } from "@/features/auth/services/auth.service";
import { User } from "@/types";
import { cn } from "cn";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ChatMessage } from "../types";
import { useSocket } from "@/context/socketContext";

const UsersList = ({
	activeUser,
	setActiveUser,
	chats,
}: {
	activeUser: User | null;
	setActiveUser: (user: User) => void;
	chats: ChatMessage[];
}) => {
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState<boolean>();
	const { socket } = useSocket();

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const result = await getAllUsers();
				setUsers(result.data);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};

		fetchUsers();
	}, []);

	const handleActiveUser = (user: User) => {
		setActiveUser(user);
		if (socket) {
			socket.emit("mark-read", user._id);
		}
	};

	console.log(activeUser?._id, "active user id");

	return (
		<Card>
			<h2 className="font-bold text-2xl mb-6">People</h2>

			{loading && <p className="text-center font-light">Loading...</p>}

			{/* user */}
			{users.length === 0 ? (
				<p className="text-center font-light">No user found</p>
			) : (
				users.map((user) => {
					return (
						<div
							key={user._id}
							onClick={() => handleActiveUser(user)}
							className={cn(
								`${activeUser?._id === user._id && "bg-primary/5"} flex justify-between mb-1 border-b border-[#B4ABAB]/70 pb-5 hover:bg-primary/5 p-1.5 cursor-pointer rounded-t-xl transition-all duration-300`,
							)}
						>
							<div className="flex gap-7 items-center">
								<Image
									src={user.profileUrl ?? "/avatar.png"}
									width={50}
									height={50}
									alt="avatar"
									className="flex shrink-0"
								/>
								<div>
									<h4 className="font-semibold text-xl">{user.username}</h4>
									<p className="font-light text-[#303030]">
										{chats.at(-1)?.message}
									</p>
								</div>
							</div>

							<div>
								<p className="font-light text-[#303030]">Today, 9.52pm</p>
								<div className="size-7 bg-[#F24E1E] ms-auto mt-1 rounded-full flex justify-center items-center text-white">
									4
								</div>
							</div>
						</div>
					);
				})
			)}
		</Card>
	);
};

export default UsersList;
