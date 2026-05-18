import React, { useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import { Session } from "@supabase/supabase-js";

export default function Dashboard() {
	const [session, setSession] = useState<Session | null>(null);
	const [activeTab, setActiveTab] = useState<"fridge" | "chef" | "shop">(
		"fridge",
	);

	return (
		<div>
			<Sidebar
				session={session}
				activeTab={activeTab}
				setActiveTab={setActiveTab}
			/>
		</div>
	);
}
