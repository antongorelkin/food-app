import React, { useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import { Session } from "@supabase/supabase-js";
import FridgeGrid from "./Fridge/FridgeGrid";
import AiChef from "./AiChef/AiChef";
import { Product } from "./Fridge/ProductCard";

export default function Dashboard() {
	const [session, setSession] = useState<Session | null>(null);
	const [activeTab, setActiveTab] = useState<"fridge" | "chef" | "shop">(
		"fridge",
	);

	const [products, setProducts] = useState<Product[]>([
		{ id: 1, name: "Молоко 3,2%", quantity: 1, unit: "л", daysLeft: 2 },
		{ id: 2, name: "Куриное филе", quantity: 0.8, unit: "кг", daysLeft: 5 },
		{ id: 3, name: "Сыр Тофу", quantity: 2, unit: "шт", daysLeft: 0 },
	]);

	return (
		<div className="flex gap-4 w-full h-full">
			<Sidebar
				session={session}
				activeTab={activeTab}
				setActiveTab={setActiveTab}
			/>
			<main className="flex-1 bg-white rounded-2xl shadow-md p-6 h-[calc(100vh - 32px)] border border-slate-100">
				{activeTab === "fridge" && (
					<FridgeGrid products={products} setProducts={setProducts} />
				)}

				{activeTab === "chef" && <AiChef products={products} />}

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
