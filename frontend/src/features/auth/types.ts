export interface Signup {
	username: string;
	email: string;
	password: string;
}

export type Login = Pick<Signup, "email" | "password">;
