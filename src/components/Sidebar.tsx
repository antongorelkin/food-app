import React from "react";
import { Refrigerator } from "lucide-react";
import NavMenu from "./NavMenu";
import LogMenu from "./LogMenu";
import { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../utils/supabaseClient";

export default function Sidebar() {
	const [activeTab, setActiveTab] = useState("fridge");
	const [session, setSession] = useState<Session | null>(null);

	useEffect(() => {
		supabase.auth
			.getSession()
			.then(({ data: { session } }) => setSession(session));
		const {
			data: { session },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});
	}, []);

	return (
		<aside className="w-64 h-[calc(100vh-32px)]  bg-white shadow-md shadow-sm rounded-2xl flex flex-col p-6 justify-between">
			<div className="flex items-center gap-3 px-2">
				<Refrigerator className="w-6 h-6 text-emerald-600" />
				<span className="font-bold text-xl text-slate-800 tracking-light">
					SmartFridge<span className="text-emerald-600">.</span>
				</span>
			</div>
			<NavMenu activeTab={activeTab} onTabChange={setActiveTab} />
			<LogMenu session={session} />
		</aside>
	);
}
