import { LogOut } from "lucide-react";
import { Session } from "@supabase/supabase-js";

interface LogMenuProps {
	session: Session | null;
	handleSignOut?: () => void;
}
export default function LogMenu({ session, handleSignOut }: LogMenuProps) {
	return (
		<div className="border-t border-slate-100 flex flex-col gap-4 py-4">
			<div className="flex items-center gap-3 px-2">
				<div className=" w-9 h-9 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 font-semibold text-sm">
					{session?.user?.email?.[0].toUpperCase() || "U"}
				</div>
				<div className="flex flex-col min-w-0">
					<span className="text-xs text-slate-400 font-medium">
						{session?.user?.user_metadata?.full_name || "Пользователь"}
					</span>
					<span
						className="text-sm font-semibold text-slate-700 truncate"
						title={session?.user?.email || ""}>
						{session?.user?.email || "Загрузка профиля..."}
					</span>
				</div>
			</div>
			<button
				onClick={handleSignOut}
				className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors">
				<LogOut className="w-4 h-4" />
				<span>Выйти из системы</span>
			</button>
		</div>
	);
}
