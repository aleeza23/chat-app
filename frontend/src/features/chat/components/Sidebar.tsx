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
	const { user } = useAuth();

	const isActive = (href: string) =>
		href === "/" ? pathname === "/" : pathname.startsWith(href);

	return (
		<aside
			aria-label="sidebar"
			className="bg-primary flex w-full flex-row items-center justify-between rounded-3xl px-4 py-2 lg:h-full lg:flex-col md:rounded-[29px] lg:px-0! md:py-6 lg:w-33.25 lg:py-8"
		>
			<div className="flex flex-row w-full items-center gap-4 lg:flex-col md:justify-center md:gap-8 lg:gap-12">
				<Image
					src={user?.profileUrl || "/avatar.png"}
					width={78}
					height={78}
					alt="avatar"
					loading="eager"
					className="size-10 rounded-full object-cover md:size-14 lg:size-19.5"
				/>

				<nav className="flex w-full flex-row items-center gap-2 text-white lg:mx-auto md:w-full lg:flex-col md:gap-4 lg:gap-6">
					{navItems.map(({ href, icon: Icon, label }) => (
						<Link
							key={href}
							href={href}
							aria-label={label}
							aria-current={isActive(href) ? "page" : undefined}
							className={`hover:border-secondary flex h-12 w-14 items-center justify-center rounded-xl border-b-4 transition-colors duration-200 hover:bg-[#612DD1]  lg:w-full lg:rounded-none lg:border-r-7 lg:border-b-0 lg:h-24.5 ${
								isActive(href)
									? "border-secondary bg-[#612DD1]"
									: "border-transparent"
							}`}
						>
							<Icon className="size-6 md:size-9 lg:size-11" />
						</Link>
					))}
				</nav>
			</div>

			<button
				type="button"
				aria-label="Log out"
				className="text-white transition-colors hover:text-secondary"
			>
				<LogOut className="size-6 cursor-pointer md:size-9 lg:size-11" />
			</button>
		</aside>
	);
};

export default Sidebar;
