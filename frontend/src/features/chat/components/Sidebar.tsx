"use client";
import React from "react";
import { House, LogOut, MessageCircleMore } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/authContext";

const navItems = [
	{ href: "/", icon: House, label: "Home" },
	{ href: "/chat", icon: MessageCircleMore, label: "Chat" },
];

const Sidebar = () => {
	const pathname = usePathname();
	const {user } = useAuth()

	const isActive = (href: string) =>
		href === "/" ? pathname === "/" : pathname.startsWith(href);

	return (
		<aside
			aria-label="sidebar"
			className="bg-primary rounded-[29px] max-w-33.25 w-full h-full flex flex-col items-center justify-between py-8"
		>
			<div className="flex flex-col justify-center items-center gap-12 w-full">
				<Image
					src={user?.profileUrl || "/avatar.png"}
					width={78}
					height={78}
					alt="avatar"
					loading="eager"
					className="rounded-full"
				/>

				<nav className="flex flex-col items-center mx-auto w-full gap-6 text-white">
					{navItems.map(({ href, icon: Icon, label }) => (
						<Link
							key={href}
							href={href}
							aria-label={label}
							aria-current={isActive(href) ? "page" : undefined}
							className={`h-24.5 w-full flex justify-center items-center border-r-7 transition-colors duration-200 hover:bg-[#612DD1] hover:border-secondary ${
								isActive(href)
									? "bg-[#612DD1] border-secondary"
									: "border-transparent"
							}`}
						>
							<Icon size={45} />
						</Link>
					))}
				</nav>
			</div>

			<div>
				<LogOut
					className="text-white hover:text-secondary cursor-pointer transition-colors"
					size={45}
				/>
			</div>
		</aside>
	);
};

export default Sidebar;
