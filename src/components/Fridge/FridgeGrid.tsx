import React from "react";
import ProductCard from "./ProductCard";

export default function FridgeGrd() {
	const [products, setProducts] = React.useState([
		{ id: 1, name: "Молоко 3,2%", quantity: 1, unit: "л", daysLeft: 2 },
		{ id: 2, name: "Куриное филе", quantity: 0.8, unit: "кг", daysLeft: 5 },
		{ id: 3, name: "Сыр Тофу", quantity: 2, unit: "шт", daysLeft: 0 },
	]);

	const handleIncrement = (id: string | number) => {
		console.log("Плюс для продукта:", id);
	};

	const handleDecrement = (id: string | number) => {
		console.log("Минус для продукта:", id);
	};

	const handleDelete = (id: string | number) => {
		console.log("Удаление продукта:", id);
	};

	return (
		<div className="w-full flex flex-col gap-6">
			<div className="flex justify-between items-center w-full">
				<h2 className="text-2xl font-bold text-slate-800">
					🧊 Мой холодильник
				</h2>
				<button className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium text-sm transition-colors cursor-pointer">
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
						onDelete={handleDelete}
					/>
				))}
			</div>
		</div>
	);
}
