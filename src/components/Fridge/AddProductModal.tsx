import React, { useState } from "react";
import { X } from "lucide-react";
import { Product } from "./ProductCard";
import { PRODUCT_CATEGORIES } from "../../utils/categoryHelper";

interface AddProductModalProps {
	isOpen: boolean;
	onClose: () => void;
	onAdd: (product: Omit<Product, "id">) => void;
}

export default function AddProductModal({
	isOpen,
	onClose,
	onAdd,
}: AddProductModalProps) {
	const [name, setName] = useState("");
	const [quantity, setQuantity] = useState<number | "">(1);
	const [unit, setUnit] = useState("шт");
	const [daysLeft, setDaysLeft] = useState<number | "">(7);
	const [category, setCategory] = useState("other");

	if (!isOpen) return null;

	const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!name.trim()) return;

		onAdd({
			name: name.trim(),
			quantity: quantity === "" ? 0 : quantity,
			unit,
			daysLeft: daysLeft === "" ? 0 : daysLeft,
			category,
		});

		setName("");
		setQuantity(1);
		setUnit("шт");
		setDaysLeft(7);
		onClose();
	};

	return (
		<div
			onClick={handleOverlayClick}
			className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 animate-fade-in">
			<div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100 w-full max-w-md mx-4 relative">
				<button
					onClick={onClose}
					className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
					<X className="w-5 h-5" />
				</button>
				<h3 className="text-lg font-bold text-slate-800 mb-4">
					🛒 Добавить в холодильник
				</h3>
				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					<div className="flex flex-col gap-1">
						<label className="text-xs font-semibold text-slate-500">
							Название продукта
						</label>
						<input
							type="text"
							placeholder="Например: Свежие томаты"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
							className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus-border-emerald-500 focus-bg-white transition-all"
						/>
					</div>

					<div className="grid grid-cools-2 gap-3">
						<div className="flex flex-col gap-1">
							<label className="text-xs font-semibold text-slate-500">
								Количество
							</label>
							<input
								type="number"
								step={unit === "шт" || unit === "уп" ? "1" : "0"}
								min="0"
								value={quantity === 0 ? "" : quantity}
								onChange={(e) => setQuantity(parseFloat(e.target.value) || 0)}
								required
								className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus-border-emerald-500 focus-bg-white transition-all"
							/>
						</div>

						<div className="flex flex-col gap-1">
							<label className="text-xs font-semibold text-slate-500">
								Ед. измерения
							</label>
							<select value={unit} onChange={(e) => setUnit(e.target.value)}>
								<option value="шт">штуки (шт)</option>
								<option value="кг">килограммы (кг)</option>
								<option value="л">литраж (л)</option>
								<option value="уп">упаковки (уп)</option>
							</select>
						</div>
					</div>
					<div className="flex flex-col gap-1">
						<label className="text-xs font-semibold text-slate-500">
							Сколько дней годен?
						</label>
						<input
							type="number"
							min="0"
							value={daysLeft === 0 ? "" : daysLeft}
							onChange={(e) => setDaysLeft(parseInt(e.target.value) || 0)}
							required
							className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus-border-emerald-500 focus-bg-white transition-all"
						/>
					</div>
					<div className="flex flex-col gap-1">
						<label className="text-xs font-semibold text-slate-500">
							Категория продукта
						</label>
						<select
							value={category}
							onChange={(e) => setCategory(e.target.value)}
							className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition-all cursor-pointer font-medium text-slate-700">
							{PRODUCT_CATEGORIES.map((cat) => (
								<option key={cat.id} value={cat.id}>
									{cat.label}
								</option>
							))}
						</select>
					</div>

					<button
						type="submit"
						className="w-full mt-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl text-sm transition-colors cursor-pointer">
						Сохранить в инвентарь
					</button>
				</form>
			</div>
		</div>
	);
}
