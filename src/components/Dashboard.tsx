import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import { Session } from "@supabase/supabase-js";
import FridgeGrid from "./Fridge/FridgeGrid";
import AiChef from "./AiChef/AiChef";
import { Product } from "./Fridge/ProductCard";
import ShoppingList from "./ShoppingList/ShoppingList";
import {
	getProducts,
	addProduct,
	updateProductQuantity,
	deleteProduct,
} from "../services/productService";

export interface ShoppingItem {
	id: string | number;
	name: string;
	isCompleted: boolean;
}

export default function Dashboard({ session }: { session: Session | null }) {
	const [activeTab, setActiveTab] = useState<"fridge" | "chef" | "shop">(
		"fridge",
	);
	const [loading, setLoading] = useState(false);
	const [products, setProducts] = useState<Product[]>(() => {
		const saved = localStorage.getItem("smart_fridge_products");
		return saved ? JSON.parse(saved) : [];
	});

	const [shoppingList, setShoppingList] = useState<ShoppingItem[]>(() => {
		const saved = localStorage.getItem("smart_fridge_shopping_list");
		return saved ? JSON.parse(saved) : [];
	});

	useEffect(() => {
		const loadCLoudData = async () => {
			try {
				setLoading(true);
				const cloudProducts = await getProducts();
				setProducts(cloudProducts);
			} catch (err) {
				console.error("Ошибка при скачивании продуктов из Supabase:", err);
			} finally {
				setLoading(false);
			}
		};
		loadCLoudData();
	}, [session]);

	const handleAddProduct = async (newProductData: Omit<Product, "id">) => {
		try {
			const savedProduct = await addProduct(newProductData);
			setProducts((prev) => [...prev, savedProduct]);
		} catch (err) {
			console.error("Не удалось сохранить продукт в облаке:", err);
		}
	};

	const handleQuantityChange = async (
		id: string | number,
		newQuantity: number,
	) => {
		try {
			setProducts((prev) =>
				prev.map((p) => (p.id === id ? { ...p, quantity: newQuantity } : p)),
			);
			await updateProductQuantity(id, newQuantity);
		} catch (err) {
			console.error("Ошибка обновления в бд:", err);
		}
	};

	const handleIncrement = (id: string | number) => {
		const p = products.find((prod) => prod.id === id);
		if (!p) return;
		const step = p.unit === "шт" || p.unit === "уп" ? 1 : 0.1;
		handleQuantityChange(id, Number((p.quantity + step).toFixed(1)));
	};

	const handleDecrement = (id: string | number) => {
		const p = products.find((prod) => prod.id === id);
		if (!p) return;
		const step = p.unit === "шт" || p.unit === "уп" ? 1 : 0.1;
		const newQty = Number((p.quantity - step).toFixed(1));
		handleQuantityChange(id, newQty < 0 ? 0 : newQty);
	};

	const handleChangeQuantityInput = (id: string | number, value: number) => {
		handleQuantityChange(id, value < 0 ? 0 : Number(value.toFixed(1)));
	};

	const handleConfirmDelete = async (id: string | number) => {
		try {
			setProducts((prev) => prev.filter((p) => p.id !== id));
			await deleteProduct(id);
		} catch (err) {
			console.error("Ошибка удаления в бд:", err);
		}
	};

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
					<FridgeGrid
						products={products}
						onAddProduct={handleAddProduct}
						onIncrement={handleIncrement}
						onDecrement={handleDecrement}
						onDelete={handleConfirmDelete}
						onChangeQuantity={handleChangeQuantityInput}
					/>
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
