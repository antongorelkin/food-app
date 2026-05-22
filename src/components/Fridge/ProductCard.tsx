import React from "react";
import { Plus, Minus, Trash2 } from "lucide-react";

export interface Product {
	id: string | number;
	name: string;
	quantity: number;
	unit: string;
	daysLeft: number;
}

interface ProductCardProps {
	product: Product;
	onIncrement: (id: string | number) => void;
	onDecrement: (id: string | number) => void;
	onDelete: (id: string | number) => void;
	onChangeQuantity: (id: string | number, value: number) => void;
}

export default function ProductCard({
	product,
	onIncrement,
	onDecrement,
	onDelete,
	onChangeQuantity,
}: ProductCardProps) {
	const isExpired = product.daysLeft <= 0;
	let statusBg = "bg-emerald-50 text-emerald-700";
	let statusText = `Свежее (${product.daysLeft} дн.)`;

	if (isExpired) {
		statusBg = "bg-rose-100 text-rose-700 font-semibold animate-pulse";
		statusText = "Просрочено!";
	} else if (product.daysLeft <= 3) {
		statusBg = "bg-amber-50 text-amber-700";
		statusText = `Истекает (${product.daysLeft} дн.)`;
	}

	return (
		<div
			className={`bg-white rounded-2xl p-5 shadow-xs border border-slate-100 flex flex-col justify-between gap-4 transition-all duration-200  ${
				isExpired
					? "opacity-50 border-rose-100"
					: "hover:shadow-md hover:-translate-y-0.5"
			}`}>
			<div className="flex flex-col gap-1.5">
				<div className="flex justify-between items-start gap-2">
					<h3
						className={`font-semibold text-base leading-snug truncate max-w-35 ${isExpired ? "line-through text-slate-400" : "text-slate-800"}`}
						title={product.name}>
						{product.name}
					</h3>
					<span
						className={`text-[11px] px-2.5 py-1 rounded-full font-medium ${statusBg}`}>
						{statusText}
					</span>
				</div>
			</div>
			<div className="flex items-center justify-between mt-2">
				<div className="flex items-center bg-slate-50 border border-slate-100 rounded-xl p-1 gap-2">
					<button
						onClick={() => onDecrement(product.id)}
						disabled={isExpired}
						className="w-7 h-7 flex items-center justify-center bg-white rounded-lg text-slate-600 shadow-xs hover:bg-slate-100 transition-colors cursor-pointer">
						<Minus className="w-3.5 h-3.5" />
					</button>
					<div className="flex items-center gap-0.5 text-xs font-semibold text-slate-700">
						<input
							type="number"
							step={
								product.unit === "шт" || product.unit === "уп" ? "1" : "0.1"
							}
							min="0"
							value={product.quantity === 0 ? "" : product.quantity}
							onChange={(e) => {
								const val = e.target.value;
								onChangeQuantity(product.id, val === "" ? 0 : parseFloat(val));
							}}
							disabled={isExpired}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									e.currentTarget.blur();
								}
							}}
							className="w-8 text-right bg-transparent border-none focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none font-bold pr-0.5"
						/>
						<span className="text-slate-400 pl-0.5 font-medium">
							{product.unit}
						</span>
					</div>
					<button
						onClick={() => onIncrement(product.id)}
						disabled={isExpired}
						className="w-7 h-7 flex items-center justify-center bg-white rounded-lg text-slate-600 shadow-xs hover:bg-slate-100 transition-colors cursor-pointer">
						<Plus className="w-3.5 h-3.5" />
					</button>
				</div>

				<button
					onClick={() => onDelete(product.id)}
					className="w-8 h-8 flex items-center justify-center text-slate-400 shadow-xs hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all cursor-pointer"
					title={
						isExpired
							? "Выбросить просроченный продукт"
							: "Продукт съеден /Удалить продукт"
					}>
					<Trash2 className="w-3.5 h-3.5" />
				</button>
			</div>
		</div>
	);
}
