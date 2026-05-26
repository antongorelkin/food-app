import React, { useState } from "react";
import ProductCard, { Product } from "./ProductCard";
import AddProductModal from "./AddProductModal";
import ConfirmModal from "../ConfirmModal";

interface FridgeGridProps {
	products: Product[];
	onAddProduct: (product: Omit<Product, "id">) => void;
	onIncrement: (id: string | number) => void;
	onDecrement: (id: string | number) => void;
	onDelete: (id: string | number) => void;
	onChangeQuantity: (id: string | number, value: number) => void;
}

export default function FridgeGrid({
	products,
	onAddProduct,
	onIncrement,
	onDecrement,
	onChangeQuantity,
	onDelete,
}: FridgeGridProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [productToDelete, setProductToDelete] = useState<
		string | number | null
	>(null);

	const handleOpenConfirm = (id: string | number) => {
		setProductToDelete(id);
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
						onIncrement={onIncrement}
						onDecrement={onDecrement}
						onDelete={handleOpenConfirm}
						onChangeQuantity={onChangeQuantity}
					/>
				))}
			</div>
			<AddProductModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onAdd={onAddProduct}
			/>
			<ConfirmModal
				isOpen={productToDelete !== null}
				title="Удаление продукта"
				message="Вы уверены, что хотите убрать этот продукт из холодильника? Данные удалятся с сервера."
				onConfirm={() => {
					if (productToDelete !== null) {
						onDelete(productToDelete); // Вызываем облачное удаление
						setProductToDelete(null);
					}
				}}
				onCancel={() => setProductToDelete(null)}
			/>
		</div>
	);
}
