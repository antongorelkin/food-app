import { supabase } from "../utils/supabaseClient";
import { useState } from "react";

export default function Auth() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isSignUp, setIsSignUp] = useState(false);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (isSignUp) {
			const { data, error } = await supabase.auth.signUp({
				email,
				password,
			});
		} else {
			const { data, error } = await supabase.auth.signInWithPassword({
				email,
				password,
			});
		}
	};

	return (
		<div className="auth-container">
			<a
				href="#"
				onClick={(e) => {
					e.preventDefault();
					setIsSignUp(!isSignUp);
				}}>
				{isSignUp
					? "Ещё нет аккаунта? Зарагестрироваться"
					: "Уже есть аккаунт? Войти"}
			</a>
			<form onSubmit={handleAuth}>
				<div>
					<label htmlFor="email">Email</label>
					<input
						type="email"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<button type="submit" disabled={loading}>
					{loading ? "Processing..." : isSignUp ? "Sign Up" : "Sign In"}
				</button>
			</form>
		</div>
	);
}
