"use client";
import Link from "next/link";
import { Eye, Lock, Mail, User } from "lucide-react";
import AuthLayout from "./Layout";
import React, { useState } from "react";
import { Signup } from "../types";
import { signup } from "../services/auth.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import axios from "axios";

const SignupForm = () => {
	const [formData, setFormData] = useState<Signup>({
		username: "",
		email: "",
		password: "",
	});
	const router = useRouter();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => {
			return {
				...prev,
				[name]: value,
			};
		});
	};

	const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			await signup(formData);
			toast.success("Signup successfully");
			router.push("/login");
		} catch (error) {
			if (axios.isAxiosError(error)) {
				toast.error(error?.response?.data?.message);
			} else {
				toast.error("Something went wrong");
			}
		}
	};

	return (
		<AuthLayout
			title="Create account"
			subtitle="Sign up to start chatting with your friends"
		>
			<form className="space-y-5" onSubmit={handleSubmit}>
				{/* Username */}
				<label className="block">
					<span className="block font-medium text-lg text-[#2b2b2b] mb-2">
						Username
					</span>
					<div className="h-16 bg-background rounded-2xl flex items-center gap-4 px-5 text-[#333333] focus-within:ring-2 focus-within:ring-primary/40 transition-all duration-300">
						<User size={26} className="shrink-0" />
						<input
							type="text"
							placeholder="Enter your Username"
							name="username"
							value={formData.username}
							onChange={handleChange}
							required
							className="w-full bg-transparent border-0 outline-none text-xl font-light tracking-[0.4px] text-[#333333] placeholder:text-[#707070]"
						/>
					</div>
				</label>

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
							name="email"
							value={formData.email}
							onChange={handleChange}
							required
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
							placeholder="Create a password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							required
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
					Sign up
				</button>
			</form>

			<p className="mt-8 text-center font-light text-lg text-[#303030]">
				Already have an account?{" "}
				<Link
					href="/login"
					className="font-semibold text-primary hover:underline"
				>
					Log in
				</Link>
			</p>
		</AuthLayout>
	);
};

export default SignupForm;
