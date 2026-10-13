import { cn } from "cn";
import React from "react";

const Card = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	return (
		<div
			className={cn(
				"bg-white rounded-[25px] p-7 shadow-[0_0_5px_2px_#79C5EF]",
				className,
			)}
		>
			{children}
		</div>
	);
};

export default Card;
