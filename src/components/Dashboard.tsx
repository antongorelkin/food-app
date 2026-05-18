import React, { useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import { Session } from "@supabase/supabase-js";

export default function Dashboard() {
	const [session, setSession] = useState<Session | null>(null);
	const [activeTab, setActiveTab] = useState<"fridge" | "chef" | "shop">(
		"fridge",
	);

	return (
		<div className="flex gap-4 w-full h-full">
			<Sidebar
				session={session}
				activeTab={activeTab}
				setActiveTab={setActiveTab}
			/>
			<main className="flex-1 bg-white rounded-2xl shadow-md p-6 h-[calc(100vh - 32px)] border border-slate-100">
				{activeTab === "fridge" && (
					<div>
						<h2 className="text-2xl font-bold text-slate-800">
							🧊 Мой холодильник
						</h2>
						<p className="text-slate-500 mt-2">
							Сюда мы начнем выводить карточки продуктов
						</p>
					</div>
				)}

				{activeTab === "chef" && (
					<div>
						<h2 className="text-2xl font-bold text-slate-800">
							🪄 ИИ-Шеф Повар
						</h2>
						<p className="text-slate-500 mt-2">
							Здесь нейросеть будет генерировать рецепты
						</p>
					</div>
				)}

				{activeTab === "shop" && (
					<div>
						<h2 className="text-2xl font-bold text-slate-800">
							🛒 Список покупок
						</h2>
						<p className="text-slate-500 mt-2">
							Здесь будет чек-лист для похода в магазин.
						</p>
					</div>
				)}
			</main>
		</div>
	);
}
