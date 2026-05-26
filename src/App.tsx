import { useState, useEffect } from "react";
import { supabase } from "./utils/supabaseClient.ts";
import { Session } from "@supabase/supabase-js";
import Auth from "./components/Auth.tsx";
import Dashboard from "./components/Dashboard";

function App() {
	const [session, setSession] = useState<Session | null>(null);

	useEffect(() => {
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, currentSession) => {
			setSession(currentSession);
		});

		supabase.auth
			.getSession()
			.then(({ data: { session: initialSession } }) =>
				setSession(initialSession),
			);

		return () => subscription.unsubscribe();
	}, []);

	return (
		<div className="min-h-screen bg-slate-100 flex p-4 gap-4">
			{session ? <Dashboard session={session} /> : <Auth />}
			{/* <Dashboard /> */}
		</div>
	);
}

export default App;
