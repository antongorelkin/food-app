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
}

export default function ProductCard({
	product,
	onIncrement,
	onDecrement,
	onDelete,
}: ProductCardProps) {
	let statusBg = "bg-emerald-50 text-emerald-700";
	let statusText = `Свежее (${product.daysLeft} дн.)`;

	if (product.daysLeft <= 0) {
		statusBg = "bg-rose-100 text-rose-700 font-semibold animate-pulse";
		statusText = "Просрочено!";
	} else if (product.daysLeft <= 3) {
		statusBg = "bg-amber-50 text-amber-700";
		statusText = `Истекает (${product.daysLeft} дн.)`;
	}

	return (
		<div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-100 flex flex-col justify-between gap-4 transition-all duration-200 hover:shadow-md hover:translate-y-0.5">
			<div className="flex flex-col gap-1.5">
				<div className="flex justify-between items-start gap-2">
					<h3
						className="font-semibold text-slate-800 text-base leading-snug truncate max-w-35"
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
						className="w-7 h-7 flex items-center justify-center bg-white rounded-lg text-slate-600 shadow-xs hover:bg-slate-100 transition-colors cursor-pointer">
						<Minus className="w-3.5 h-3.5" />
					</button>
					<span className="text-xs font-semibold text-slate-700 min-w-11.25 text-center select-none">
						{product.quantity} {product.unit}
					</span>
					<button
						onClick={() => onIncrement(product.id)}
						className="w-7 h-7 flex items-center justify-center bg-white rounded-lg text-slate-600 shadow-xs hover:bg-slate-100 transition-colors cursor-pointer">
						<Plus className="w-3.5 h-3.5" />
					</button>
				</div>

				<button
					onClick={() => onDelete(product.id)}
					className="w-8 h-8 flex items-center justify-center text-slate-400 shadow-xs hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all cursor-pointer"
					title="Удалить / Съедено">
					<Trash2 className="w-3.5 h-3.5" />
				</button>
			</div>
		</div>
	);
}
