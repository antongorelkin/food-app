import { supabase } from "../utils/supabaseClient";
import { useState } from "react";
import { Refrigerator, Mail, Lock, AlertCircle, Sparkles } from "lucide-react";

export default function Auth() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isSignUp, setIsSignUp] = useState(false);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		try {
			if (isSignUp) {
				const { error: signUpError } = await supabase.auth.signUp({
					email,
					password,
				});
				if (signUpError) throw signUpError;
				alert("Регистрация успешна! Теперь вы можете войти.");
				setIsSignUp(false);
			} else {
				const { error: signInError } = await supabase.auth.signInWithPassword({
					email,
					password,
				});
				if (signInError) throw signInError;
			}
		} catch (err: any) {
			setError(err.message || "Произошла ошибка при авторизации");
		} finally {
			setLoading(false);
		}
	};
	const toggleMode = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		setIsSignUp(!isSignUp);
		setError(null);
	};

	return (
		<div className="min-h-[calc(100vh-32px)] w-full flex items-center justify-center bg-slate-100 p-4">
			<div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 w-full max-w-md flex flex-col gap-6 animate-fade-in">
				<div className="flex flex-col items-center text-center gap-2">
					<div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shadow-xs">
						<Refrigerator className="w-6 h-6" />
					</div>
					<h2 className="text-2xl font-bold text-slate-800 tracking-tight mt-2">
						SmartFridge<span className="text-emerald-600">.</span>
					</h2>
					<p className="text-xs text-slate-400 max-w-60">
						{isSignUp
							? "Создайте аккаунт, чтобы запустить вашего персонального ИИ-Шефа"
							: "Войдите, чтобы получить доступ к своему умному холодильнику"}
					</p>
				</div>

				<form onSubmit={handleAuth} className="flex flex-col gap-4">
					<div className="flex flex-col gap-1.5">
						<label
							htmlFor="email"
							className="text-xs font-bold text-slate-500 uppercase tracking-wider pl-1">
							Email адрес
						</label>
						<div className="relative flex items-center">
							<Mail className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none" />
							<input
								type="email"
								id="email"
								placeholder="you@example.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus-border-emerald-500 focus:bg-white transition-all font-medium"
							/>
						</div>
					</div>
					<div className="flex flex-col gap-1.5">
						<label
							htmlFor="password"
							className="text-xs font-bold text-slate-500 uppercase tracking-wider pl-1">
							Пароль
						</label>
						<div className="relative flex items-center">
							<Lock className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none" />
							<input
								type="password"
								id="password"
								placeholder="••••••••"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus-border-emerald-500 focus:bg-white transition-all font-medium"
							/>
						</div>
					</div>

					{error && (
						<div className="flex items-center gap-2 bg-rose-50 border border-rose-100 text-rose-600 font-medium animate-fade-in rounded-xl p-3">
							<AlertCircle className="w-4 h-4 shrink-0" />
							<span>{error}</span>
						</div>
					)}

					<button
						type="submit"
						disabled={loading}
						className="w-full mt-2 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-xl text-sm transition-all shadow-md shadow-emerald-600/10 hover:-translate-y-0.5 active:translate-y-0 disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2">
						{loading ? (
							<span className="animate-pulse">Проверка данных...</span>
						) : (
							<Sparkles className="w-4 h-4">
								<span>
									{isSignUp ? "Зарегистрироваться" : "Войти в аккаунт"}
								</span>
							</Sparkles>
						)}
					</button>
				</form>

				<div className="text-center border-t border-slate-50 pt-4">
					<a
						href="#"
						onClick={toggleMode}
						className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
						{isSignUp
							? "Уже есть аккаунт? Войти"
							: "Ещё нет аккаунта? Зарегистрироваться"}
					</a>
				</div>
			</div>
		</div>
	);
}
