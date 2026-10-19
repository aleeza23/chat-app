import { MessageCircle } from "lucide-react";

interface AuthLayoutProps {
	title: string;
	subtitle: string;
	children: React.ReactNode;
}

const AuthLayout = ({ title, subtitle, children }: AuthLayoutProps) => {
	return (
		<div className="min-h-dvh bg-background flex items-center justify-center p-6">
			<div className="w-full max-w-250 bg-white rounded-[25px] shadow-[0_2px_6px_rgba(130,180,235,0.45)] overflow-hidden grid md:grid-cols-2">
				<div className="hidden md:flex flex-col justify-between bg-primary text-white p-12 relative overflow-hidden">
					<div className="absolute -top-24 -right-24 size-72 rounded-full bg-white/10" />
					<div className="absolute -bottom-32 -left-20 size-80 rounded-full bg-white/10" />

					<div className="relative flex items-center gap-4">
						<div className="size-14 rounded-2xl bg-white/15 flex items-center justify-center">
							<MessageCircle size={32} />
						</div>
						<span className="font-bold text-2xl">ChatApp</span>
					</div>

					<div className="relative">
						<h2 className="font-bold text-4xl leading-tight mb-4">
							Stay connected with the people who matter.
						</h2>
						<p className="font-light text-xl text-white/80 mb-10">
							Chat, call and share moments, all in one place.
						</p>

						<div className="space-y-5 pl-2 pr-3">
							<div className="relative w-fit h-12 px-6 rounded-full bg-white/20 flex items-center text-lg after:content-[''] after:absolute after:-bottom-1 after:-left-2 after:size-2.25 after:rounded-full after:bg-white/30">
								Hey there!
							</div>
							<div className="relative w-fit ml-auto h-12 px-6 rounded-full bg-white text-primary flex items-center text-lg after:content-[''] after:absolute after:-bottom-1 after:-right-3 after:size-2.25 after:rounded-full after:bg-white">
								Welcome to ChatApp
							</div>
						</div>
					</div>
				</div>

				{/* right: form */}
				<div className="p-8 sm:p-12 flex flex-col justify-center">
					<h1 className="font-bold text-3xl text-[#2b2b2b] mb-2">{title}</h1>
					<p className="font-light text-xl text-[#707070] mb-8">{subtitle}</p>
					{children}
				</div>
			</div>
		</div>
	);
};

export default AuthLayout;