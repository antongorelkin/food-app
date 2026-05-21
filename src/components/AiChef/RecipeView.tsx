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
}

export default function RecipeView({ recipe }: RecipeViewProps) {
	return (
		<div className="bg-white rounded-2xl p-6 boder border-slate-100 shadow-xs flex flex-col gap-6">
			<div className="flex flex-col gap-1.5 border-b border-slate-50 pb-4">
				<h3 className="text-xl font-bold text-slate-800 leading-tight">
					{recipe.title}
				</h3>
				<div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
					<Clock className="w-3.5 h-3.5" />
					<span> Время приготовления: {recipe.time}</span>
				</div>
			</div>

			<div className="flex flex-cool gap-3">
				<h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
					<ListOrdered className="w-4 h-4 text-emerald-600" /> Инструкция
				</h4>
				<ol className="flex flex-col gap-3">
					{recipe.steps.map((step, index) => (
						<li
							key={index}
							className="flex gap-3 text-sm text-slate-600 leading-relaxed">
							<span className="shrink-0 w-5 h-5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs flex items-center justify-center mt0.5">
								{index + 1}
							</span>
							<span>{step}</span>
						</li>
					))}
				</ol>
			</div>

			{recipe.missing && recipe.missing.length > 0 && (
				<div className="flex flex-col gap-3 border-t border-slate-50 pt-5 mt-2">
					<h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
						<ShoppingCart className="w-4 h-4 text-amber-500" /> Не хватает
						ингридиентов
					</h4>
					<p className="text-xs text-slate-400 mt-1">
						Этих продуктов нет в вашем холодильнике. Нажмите на продукт, чтобы
						добавить его в список покупок.
					</p>

					<div className="flex flex-wrap gap-2 mt-1">
						{recipe.missing.map((item, index) => (
							<button
								key={index}
								onClick={() => console.log("Добавить в покупки:", item)}
								className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50/60hover:bg-amber-100 text-amber-800 rounded-xl font-medium border border-amber-100/50 transition-colors cursor-pointer">
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
