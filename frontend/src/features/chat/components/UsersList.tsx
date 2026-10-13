import Card from "@/components/Card";
import Image from "next/image";
import React from "react";

const UsersList = () => {
	return (
		<Card>
			<h2 className="font-bold text-2xl mb-6">People</h2>

			{/* user */}
			<div className="flex justify-between border-b border-[#B4ABAB]/70 pb-5 hover:bg-primary/5 p-1.5 cursor-pointer rounded-t-xl transition-all duration-300">
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
							Last message from aleeza
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
		</Card>
	);
};

export default UsersList;
