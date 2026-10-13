import Link from "next/link";
import { Eye, Lock, Mail } from "lucide-react";
import AuthLayout from "./Layout";

const LoginForm = () => {
	return (
		<AuthLayout title="Welcome back" subtitle="Log in to continue chatting">
			<form className="space-y-6">
				{/* email */}
				<label className="block">
					<span className="block font-medium text-lg text-[#2b2b2b] mb-2">
						Email
					</span>
					<div className="h-16 bg-background rounded-2xl flex items-center gap-4 px-5 text-[#333333] focus-within:ring-2 focus-within:ring-primary/40 transition-all duration-300">
						<Mail size={26} className="shrink-0" />
						<input
							type="email"
							placeholder="Enter your email"
							className="w-full bg-transparent border-0 outline-none text-xl font-light tracking-[0.4px] text-[#333333] placeholder:text-[#707070]"
						/>
					</div>
				</label>

				{/* password */}
				<label className="block">
					<span className="block font-medium text-lg text-[#2b2b2b] mb-2">
						Password
					</span>
					<div className="h-16 bg-background rounded-2xl flex items-center gap-4 px-5 text-[#333333] focus-within:ring-2 focus-within:ring-primary/40 transition-all duration-300">
						<Lock size={26} className="shrink-0" />
						<input
							type="password"
							placeholder="Enter your password"
							className="w-full bg-transparent border-0 outline-none text-xl font-light tracking-[0.4px] text-[#333333] placeholder:text-[#707070]"
						/>
						<Eye size={26} className="shrink-0 cursor-pointer" />
					</div>
				</label>


				{/* button */}
				<button
					type="submit"
					className="w-full h-16 bg-primary text-white font-medium text-xl rounded-2xl shadow-[0_2px_6px_rgba(108,0,255,0.35)] hover:opacity-90 active:scale-[0.98] transition-all duration-300 cursor-pointer"
				>
					Log in
				</button>
			</form>

			<p className="mt-8 text-center font-light text-lg text-[#303030]">
				Don&apos;t have an account?{" "}
				<Link
					href="/signup"
					className="font-semibold text-primary hover:underline"
				>
					Sign up
				</Link>
			</p>
		</AuthLayout>
	);
};

export default LoginForm;