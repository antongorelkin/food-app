import React, { useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import { Session } from "@supabase/supabase-js";
import FridgeGrid from "./Fridge/FridgeGrid";
import AiChef from "./AiChef/AiChef";
import { Product } from "./Fridge/ProductCard";
import ShoppingList from "./ShoppingList/ShoppingList";

export interface ShoppingItem {
	id: string | number;
	name: string;
	isCompleted: boolean;
}

export default function Dashboard() {
	const [session, setSession] = useState<Session | null>(null);
	const [activeTab, setActiveTab] = useState<"fridge" | "chef" | "shop">(
		"fridge",
	);
	const [products, setProducts] = useState<Product[]>(() => {
		const saved = localStorage.getItem("smart_fridge_products");
		return saved ? JSON.parse(saved) : [];
	});

	const [shoppingList, setShoppingList] = useState<ShoppingItem[]>(() => {
		const saved = localStorage.getItem("smart_fridge_shopping_list");
		return saved ? JSON.parse(saved) : [];
	});

	const handleToggleComplete = (id: string | number) => {
		const updatedList = shoppingList.map((item) =>
			item.id === id ? { ...item, isCompleted: !item.isCompleted } : item,
		);
		setShoppingList(updatedList);
		localStorage.setItem(
			"smart_fridge_shopping_list",
			JSON.stringify(updatedList),
		);
	};

	const handleDeleteShoppingItem = (id: string | number) => {
		const updatedList = shoppingList.filter((item) => item.id !== id);
		setShoppingList(updatedList);
		localStorage.setItem(
			"smart_fridge_shopping_list",
			JSON.stringify(updatedList),
		);
	};

	const handleClearAllShoppingList = () => {
		setShoppingList([]);
		localStorage.removeItem("smart_fridge_shopping_list");
	};

	const handleAddToShoppingList = (name: string) => {
		const isExist = shoppingList.some(
			(item) => item.name.toLowerCase() === name.toLowerCase(),
		);
		if (isExist) return;

		const newItem: ShoppingItem = {
			id: Date.now(),
			name,
			isCompleted: false,
		};

		const updatedList = [...shoppingList, newItem];
		setShoppingList(updatedList);
		localStorage.setItem(
			"smart_fridge_shopping_list",
			JSON.stringify(updatedList),
		);
	};

	return (
		<div className="flex flex-col md:flex-row gap-4 w-full min-h-[calc(100vh-32px)] md:h-[calc(100vh-32px)] pb-16 md:pb-0 relative">
			<div className="hidden md:flex shrink-0">
				<Sidebar
					session={session}
					activeTab={activeTab}
					setActiveTab={setActiveTab}
				/>
			</div>
			<main className="flex-1 bg-white rounded-2xl shadow-md p-5 md:p-6 h-full border border-slate-100 overflow-y-auto">
				{activeTab === "fridge" && (
					<FridgeGrid products={products} setProducts={setProducts} />
				)}

				{activeTab === "chef" && (
					<AiChef products={products} onAddToShop={handleAddToShoppingList} />
				)}

				{activeTab === "shop" && (
					<ShoppingList
						items={shoppingList}
						onToggleComplete={handleToggleComplete}
						onDeleteItem={handleDeleteShoppingItem}
						onClearAll={handleClearAllShoppingList}
					/>
				)}
			</main>

			<nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-slate-100 flex justify-around items-center py-2 px-4 z-40 shadow-lg">
				<button
					onClick={() => setActiveTab("fridge")}
					className={`flex flex-col items-center gap-1 p-2 cursor-pointer transition-colors ${
						activeTab === "fridge"
							? "text-emerald-600 font-semibold"
							: "text-slate-400"
					}`}>
					<span className="text-lg">🧊</span>
					<span className="text-[10px]">Холодильник</span>
				</button>

				<button
					onClick={() => setActiveTab("chef")}
					className={`flex flex-col items-center gap-1 p-2 cursor-pointer transition-colors ${
						activeTab === "chef"
							? "text-emerald-600 font-semibold"
							: "text-slate-400"
					}`}>
					<span className="text-lg">🪄</span>
					<span className="text-[10px]">ИИ-Шеф</span>
				</button>

				<button
					onClick={() => setActiveTab("shop")}
					className={`flex flex-col items-center gap-1 p-2 cursor-pointer transition-colors ${
						activeTab === "shop"
							? "text-emerald-600 font-semibold"
							: "text-slate-400"
					}`}>
					<span className="text-lg">🛒</span>
					<span className="text-[10px]">Покупки</span>
				</button>
			</nav>
		</div>
	);
}
