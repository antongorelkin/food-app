import React from "react";
import { Clock, ListOrdered, ShoppingCart } from "lucide-react";

export interface Recipe {
	title: string;
	time: string;
	steps: string[];
	missing: string[];
}

interface RecipeViewProps {
	recipe: Recipe;
	onAddToShop: (name: string) => void;
}

export default function RecipeView({ recipe, onAddToShop }: RecipeViewProps) {
	return (
		// 1. ИСПРАВЛЕНО: boder -> border
		<div className="bg-white rounded-2xl p-5 md:p-6 border border-slate-100 shadow-xs flex flex-col gap-6 w-full">
			<div className="flex flex-col gap-1.5 border-b border-slate-50 pb-4">
				<h3 className="text-xl font-bold text-slate-800 leading-tight">
					{recipe.title}
				</h3>
				<div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
					<Clock className="w-3.5 h-3.5" />
					<span> Время приготовления: {recipe.time}</span>
				</div>
			</div>

			{/* 2. ИСПРАВЛЕНО: flex-cool -> flex-col (теперь заголовок встанет НАД шагами) */}
			<div className="flex flex-col gap-3 w-full">
				<h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
					<ListOrdered className="w-4 h-4 text-emerald-600 shrink-0" />{" "}
					Инструкция
				</h4>
				<ol className="flex flex-col gap-3 w-full">
					{recipe.steps.map((step, index) => (
						<li
							key={index}
							className="flex gap-2.5 text-xs md:text-sm text-slate-600 leading-relaxed items-start w-full">
							<span className="shrink-0 w-5 h-5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px] md:text-xs flex items-center justify-center mt-0.5 select-none">
								{index + 1}
							</span>
							{/* 3. ИСПРАВЛЕНО: wrap-break-word -> break-words */}
							<span className="wrap-break-word flex-1 min-w-0">{step}</span>
						</li>
					))}
				</ol>
			</div>

			{recipe.missing && recipe.missing.length > 0 && (
				<div className="flex flex-col gap-3 border-t border-slate-50 pt-5 mt-2 w-full">
					<h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
						<ShoppingCart className="w-4 h-4 text-amber-500 shrink-0" /> Не
						хватает ингредиентов
					</h4>
					<p className="text-xs text-slate-400 mt-1">
						Этих продуктов нет в вашем холодильнике. Нажмите на продукт, чтобы
						добавить его в список покупок.
					</p>

					<div className="flex flex-wrap gap-2 mt-1">
						{recipe.missing.map((item, index) => (
							<button
								key={index}
								onClick={() => onAddToShop(item)}
								// 4. ИСПРАВЛЕНО: добавлен пробел перед hover:bg-amber-100
								className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50/60 hover:bg-amber-100 text-amber-800 rounded-xl font-medium border border-amber-100/50 transition-colors cursor-pointer text-xs">
								<span className="text-amber-500 font-bold text-sm">+</span>
								{item}
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
