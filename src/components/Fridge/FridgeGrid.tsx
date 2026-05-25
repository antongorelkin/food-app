import React, { useState } from "react";
import ProductCard, { Product } from "./ProductCard";
import AddProductModal from "./AddProductModal";
import ConfirmModal from "../ConfirmModal";

export default function FridgeGrid({
	products,
	setProducts,
}: {
	products: Product[];
	setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [productToDelete, setProductToDelete] = useState<
		string | number | null
	>(null);

	const handleOpenConfirm = (id: string | number) => {
		setProductToDelete(id);
	};

	const handleConfirmDelete = () => {
		if (productToDelete !== null) {
			const updatedProducts = products.filter((p) => p.id !== productToDelete);
			setProducts(updatedProducts);
			localStorage.setItem(
				"smart_fridge_products",
				JSON.stringify(updatedProducts),
			);
			setProductToDelete(null);
		}
	};

	const handleAddProduct = (newProductData: Omit<Product, "id">) => {
		const newProduct: Product = {
			...newProductData,
			id: Date.now(),
		};

		const updatedProducts = [...products, newProduct];
		setProducts(updatedProducts);
		localStorage.setItem(
			"smart_fridge_products",
			JSON.stringify(updatedProducts),
		);
	};

	const handleIncrement = (id: string | number) => {
		const updatedProducts = products.map((product) => {
			if (product.id === id) {
				const step = product.unit === "шт" || product.unit === "уп" ? 1 : 0.1;
				const newQuantity = Number((product.quantity + step).toFixed(1));
				return { ...product, quantity: newQuantity };
			}
			return product;
		});
		setProducts(updatedProducts);
		localStorage.setItem(
			"smart_fridge_products",
			JSON.stringify(updatedProducts),
		);
	};

	const handleDecrement = (id: string | number) => {
		const updatedProducts = products.map((product) => {
			if (product.id === id) {
				const step = product.unit === "шт" || product.unit === "уп" ? 1 : 0.1;
				const newQuantity = Number((product.quantity - step).toFixed(1));
				return { ...product, quantity: newQuantity < 0 ? 0 : newQuantity };
			}
			return product;
		});
		setProducts(updatedProducts);
		localStorage.setItem(
			"smart_fridge_products",
			JSON.stringify(updatedProducts),
		);
	};

	const handleChangeQuantity = (id: string | number, value: number) => {
		const updatedProducts = products.map((p) =>
			p.id === id ? { ...p, quantity: value } : p,
		);
		setProducts(updatedProducts);
		localStorage.setItem(
			"smart_fridge_products",
			JSON.stringify(updatedProducts),
		);
	};

	return (
		<div className="w-full flex flex-col gap-6">
			<div className="flex justify-between items-center w-full">
				<h2 className="text-2xl font-bold text-slate-800">
					🧊 Мой холодильник
				</h2>
				{products.length > 0 && (
					<button
						onClick={() => setIsModalOpen(true)}
						className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium text-sm transition-colors cursor-pointer">
						+ Добавить продукт
					</button>
				)}
			</div>

			{products.length === 0 && (
				<div className="flex flex-col items-center justify-center py-20 text-center gap-4 bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-8 max-w-xl mx-auto w-full animate-fade-in">
					<span className="text-4xl animate-bounce">🥶</span>
					<h3 className="font-bold text-slate-700 text-lg">
						Ваш refrigerator совершенно пуст
					</h3>
					<p className="text-sm text-slate-400 max-w-[320px] leading-relaxed">
						Здесь пока ничего нет. Добавьте продукты, которые лежат у вас дома,
						чтобы ИИ-Шеф мог составить персональное меню!
					</p>
					<button
						onClick={() => {
							setIsModalOpen(true);
						}}
						className="mt-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold text-sm transition-all shadow-xs hover:-translate-y-0.5 cursor-pointer">
						Заполнить холодильник
					</button>
				</div>
			)}

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
				{products.map((product) => (
					<ProductCard
						key={product.id}
						product={product}
						onIncrement={handleIncrement}
						onDecrement={handleDecrement}
						onDelete={handleOpenConfirm}
						onChangeQuantity={handleChangeQuantity}
					/>
				))}
			</div>
			<AddProductModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onAdd={handleAddProduct}
			/>
			<ConfirmModal
				isOpen={productToDelete !== null}
				title="Удаление продукта"
				message="Вы уверены, что хотите убрать этот продукт из холодильника? Это действие нельзя будет отменить."
				onConfirm={handleConfirmDelete}
				onCancel={() => setProductToDelete(null)}
			/>
		</div>
	);
}
