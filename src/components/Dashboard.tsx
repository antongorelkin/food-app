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

export default function Dashboard() {
	const [session, setSession] = useState<Session | null>(null);
	const [activeTab, setActiveTab] = useState<"fridge" | "chef" | "shop">(
		"fridge",
	);
	const [loading, setLoading] = useState(false);
	const [products, setProducts] = useState<Product[]>([]);

	const [shoppingList, setShoppingList] = useState<ShoppingItem[]>(() => {
		const saved = localStorage.getItem("smart_fridge_shopping_list");
		return saved ? JSON.parse(saved) : [];
	});

	useEffect(() => {
		const loadData = async () => {
			try {
				setLoading(true);
				const data = await getProducts();
				setProducts(data);
			} catch (error) {
				console.error("Не удалось загрузить продукты из Supabase:", error);
			} finally {
				setLoading(false);
			}
		};
		loadData();
	}, []);

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

	const handleAddProduct = async (newProductData: Omit<Product, "id">) => {
		try {
			const savedProduct = await addProduct(newProductData);
			setProducts((prev) => [...prev, savedProduct]);
		} catch (error) {
			console.error("Ошибка при добавлении продукта в базу:", error);
			alert("Не удалось сохранить продукт на сервере");
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
		} catch (error) {
			console.error("Ошибка при обновлении количества в базе:", error);
		}
	};

	const handleIncrement = (id: string | number) => {
		const p = products.find((p) => p.id === id);
		if (!p) return;
		const step = p.unit === "шт" || p.unit === "уп" ? 1 : 0.1;
		handleQuantityChange(id, Number((p.quantity + step).toFixed(1)));
	};

	const handleDecrement = (id: string | number) => {
		const p = products.find((p) => p.id === id);
		if (!p) return;
		const step = p.unit === "шт" || p.unit === "уп" ? 1 : 0.1;
		const newQuantity = Number((p.quantity - step).toFixed(1));
		handleQuantityChange(id, newQuantity < 0 ? 0 : newQuantity);
	};

	const handleChangeQuantityInput = (id: string | number, value: number) => {
		handleQuantityChange(id, value < 0 ? 0 : Number(value.toFixed(1)));
	};

	const handleConfirmDeleteProduct = async (id: string | number) => {
		try {
			setProducts((prev) => prev.filter((p) => p.id !== id));
			await deleteProduct(id);
		} catch (error) {
			console.error("Ошибка при удалении продукта из базы:", error);
		}
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
		<div className="flex gap-4 w-full h-full">
			<Sidebar
				session={session}
				activeTab={activeTab}
				setActiveTab={setActiveTab}
			/>
			<main className="flex-1 bg-white rounded-2xl shadow-md p-6 h-[calc(100vh - 32px)] border border-slate-100">
				{activeTab === "fridge" &&
					(loading ? (
						<div className="flex items-center justify-center h-full text-sm text-slate-400 animate-pulse">
							🔮 Синхронизация с облачным холодильником...
						</div>
					) : (
						<FridgeGrid
							products={products}
							onAddProduct={handleAddProduct}
							onIncrement={handleIncrement}
							onDecrement={handleDecrement}
							onChangeQuantity={handleChangeQuantityInput}
							onDelete={handleConfirmDeleteProduct}
						/>
					))}

				{activeTab === "chef" && (
					<AiChef products={products} onAddToShop={handleAddToShoppingList} />
				)}

				{activeTab === "shop" && (
					<div>
						<h2 className="text-2xl font-bold text-slate-800">
							🛒 Список покупок
						</h2>
						<p className="text-slate-500 mt-2">
							<ShoppingList
								items={shoppingList}
								onToggleComplete={handleToggleComplete}
								onDeleteItem={handleDeleteShoppingItem}
								onClearAll={handleClearAllShoppingList}
							/>
						</p>
					</div>
				)}
			</main>
		</div>
	);
}
