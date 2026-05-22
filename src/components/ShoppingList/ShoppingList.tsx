import React from "react";
import { CheckSquare, Square, Trash2, ShoppingBag } from "lucide-react";
import { ShoppingItem } from "../Dashboard";

interface ShoppingListProps {
	items: ShoppingItem[];
	onToggleComplete: (id: string | number) => void;
	onDeleteItem: (id: string | number) => void;
	onClearAll: () => void;
}

export default function ShoppingList({
	items,
	onToggleComplete,
	onDeleteItem,
	onClearAll,
}: ShoppingListProps) {
	return (
		<div className="w-full flex flex-col gap-6 max-w-xl mx-auto animate-fade-in">
			<div className="flex justify-between items-center w-full border-b border-slate-100 pb-4">
				<div>
					<h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
						<ShoppingBag className="w-6 h-6 text-emerald-600" /> Мой список
						покупок
					</h2>
					<p className="text-xs text-slate-400 mt-1">
						Всего товаров : {items.length} - Из них куплено:{" "}
						{items.filter((item) => item.isCompleted).length}
					</p>
				</div>
				{items.length > 0 && (
					<button
						onClick={onClearAll}
						className="text-xs font-semibold text-rose-500 hover:text-rose-600 transition-colors rounded-xl hover:bg-rose-50 p-2 cursor-pointer">
						Очистить весь список
					</button>
				)}
			</div>

			{items.length === 0 && (
				<div className="flex flex-col items-center justify-center py-12 text-center gap-3 bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-6">
					<span className="text-3xl animate-pulse">🛒</span>
					<h3 className="font-semibold text-slate-700 text-sm">
						Ваш список покупок пуст
					</h3>
					<p className="text-xs text-slate-400 max-w-75 leading-relaxed">
						Нажмите на ингредиенты с пометкой{" "}
						<strong className="text-amber-600 font-semibold">"+"</strong> внизу
						рецептов ИИ-Шефа, и они автоматически прилетят сюда!
					</p>
				</div>
			)}

			{items.length > 0 && (
				<div className="flex flex-col gap-2.5">
					{items.map((item) => (
						<div
							key={item.id}
							className={`flex justify-between items-center p-4 rounded-xl border transitionn-all duration-200 ${
								item.isCompleted
									? "bg-slate-50/70 border-slate-100 text-slate-400"
									: "bg-white border-slate-100 text-slate-700 hover:shadow-xs hover:border-slate-200"
							}`}>
							<button
								onClick={() => onToggleComplete(item.id)}
								className="flex items-center gap-3.5 text-left cursor-pointer flex-1 min-w-0">
								<div className="shrink-0">
									{item.isCompleted ? (
										<CheckSquare className="w-5 h-5 text-emerald-600" />
									) : (
										<Square className="w-5 h-5 text-slate-300 hover:text-emerald-500 transition-colors" />
									)}
								</div>
								<span
									className={`text-sm font-medium truncate ${item.isCompleted ? "line-through text-slate-400" : "text-slate-700"}`}>
									{item.name}
								</span>
							</button>
							<button
								onClick={() => onDeleteItem(item.id)}
								className="w-8 h-8 flex items-center justify-center text-slate-300 hover:text-rose-500 hover:-bg-rose-50 rounded-lg transition-colors cursor-pointer"
								title="Удалить из списка">
								<Trash2 className="w-4 h-4" />
							</button>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
