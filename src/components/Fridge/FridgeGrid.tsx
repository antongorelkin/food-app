import React, { useState } from "react";
import ProductCard, { Product } from "./ProductCard";
import AddProductModal from "./AddProductModal";
import ConfirmModal from "../ConfirmModal";

export default function FridgeGrd() {
	const [products, setProducts] = useState<Product[]>([
		{ id: 1, name: "Молоко 3,2%", quantity: 1, unit: "л", daysLeft: 2 },
		{ id: 2, name: "Куриное филе", quantity: 0.8, unit: "кг", daysLeft: 5 },
		{ id: 3, name: "Сыр Тофу", quantity: 2, unit: "шт", daysLeft: 0 },
	]);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [productToDelete, setProductToDelete] = useState<
		string | number | null
	>(null);

	const handleOpenConfirm = (id: string | number) => {
		setProductToDelete(id);
	};

	const handleConfirmDelete = () => {
		if (productToDelete !== null) {
			setProducts(products.filter((product) => product.id !== productToDelete));
			setProductToDelete(null);
		}
	};

	const handleAddProduct = (newProductData: Omit<Product, "id">) => {
		const newProduct: Product = {
			...newProductData,
			id: Date.now(),
		};
		setProducts([...products, newProduct]);
	};

	const handleIncrement = (id: string | number) => {
		setProducts(
			products.map((product) => {
				if (product.id === id) {
					const step = product.unit === "шт" || product.unit === "уп" ? 1 : 0.1;
					const newQuantity = Number((product.quantity + step).toFixed(1));
					return { ...product, quantity: newQuantity };
				}
				return product;
			}),
		);
	};

	const handleDecrement = (id: string | number) => {
		setProducts(
			products.map((product) => {
				if (product.id === id) {
					const step = product.unit === "шт" || product.unit === "уп" ? 1 : 0.1;
					const newQuantity = Number((product.quantity - step).toFixed(1));
					return { ...product, quantity: newQuantity };
				}
				return product;
			}),
		);
	};

	const handleChangeQuantity = (id: string | number, value: number) => {
		setProducts(
			products.map((product) =>
				product.id === id
					? { ...product, quantity: value < 0 ? 0 : Number(value.toFixed(1)) }
					: product,
			),
		);
	};

	return (
		<div className="w-full flex flex-col gap-6">
			<div className="flex justify-between items-center w-full">
				<h2 className="text-2xl font-bold text-slate-800">
					🧊 Мой холодильник
				</h2>
				<button
					onClick={() => setIsModalOpen(true)}
					className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium text-sm transition-colors cursor-pointer">
					+ Добавить продукт
				</button>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg-grid-cols-3 xl:grid-cols-4 gap-4 w-full">
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
