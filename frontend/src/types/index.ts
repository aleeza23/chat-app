export interface User {
	_id: string;
	username: string;
	email: string;
	profileUrl?: string;
	isOnline: boolean;
	lastSeen: Date;
}
