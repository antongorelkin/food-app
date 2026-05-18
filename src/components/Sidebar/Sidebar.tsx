import React from "react";
import { Refrigerator } from "lucide-react";
import NavMenu from "./NavMenu";
import LogMenu from "./LogMenu";
import { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../../utils/supabaseClient";

interface SidebarProps {
	activeTab: "fridge" | "chef" | "shop";
	setActiveTab: (tab: "fridge" | "chef" | "shop") => void;
	session: Session | null;
}

export default function Sidebar({
	activeTab,
	setActiveTab,
	session,
}: SidebarProps) {
	const handleSignOut = async () => {
		try {
			const { error } = await supabase.auth.signOut();
			if (error) throw error;
		} catch (err) {
			console.error("Ошибка при выходе из системы:", err);
		}
	};
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
