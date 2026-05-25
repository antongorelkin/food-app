import React from "react";
import { Sparkles, Clock, ListOrdered, ShoppingCart } from "lucide-react";
import RecipeSkeleton from "./RecipeSkeleton";
import RecipeView from "./RecipeView";
import { Product } from "../Fridge/ProductCard";
import { fetchRecipeFromAi } from "../../utils/aiService";

interface Recipe {
	title: string;
	time: string;
	steps: string[];
	missing: string[];
}

interface AiChefProps {
	products: Product[];
	onAddToShop: (name: string) => void;
}

export default function AiChef({ products, onAddToShop }: AiChefProps) {
	const [recipe, setRecipe] = React.useState<Recipe | null>(() => {
		const savedRecipe = localStorage.getItem("smart_fridge_cached_recipe");
		return savedRecipe ? JSON.parse(savedRecipe) : null;
	});
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState<string | null>(null);

	const handleGenerateRecipe = async () => {
		const freshProducts = products.filter((product) => product.daysLeft > 0);

		if (freshProducts.length === 0) {
			setError(
				"Ваш холодильник пуст! Пожалуйста, добавьте продукты, чтобы наш шеф-повар мог придумать рецепт.",
			);
			return;
		}
		setLoading(true);
		setRecipe(null);
		setError(null);

		localStorage.removeItem("smart_fridge_cached_recipe");

		try {
			const generatedRecipe = await fetchRecipeFromAi(freshProducts);
			localStorage.setItem(
				"smart_fridge_cached_recipe",
				JSON.stringify(generatedRecipe),
			);
			setRecipe(generatedRecipe);
		} catch (err: any) {
			setError(
				"Произошла ошибка при генерации рецепта. Пожалуйста, попробуйте еще раз.",
			);
		} finally {
			setLoading(false);
		}
	};

	const handleResetRecipe = () => {
		setRecipe(null);
		localStorage.removeItem("smart_fridge_cached_recipe");
	};

	return (
		<div className="w-full flex flex-col gap-5 max-w-2xl mx-auto px-2 md:px-0 animate-fade-in">
			<div>
				<h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
					<Sparkles className="w-6 h-6 text-emerald-600" /> ИИ-Шеф Повар
				</h2>
				<p className="text-sm text-slate-500 mt-1">
					В вашем распоряжении {products.length} ингредиент(ов). Умный шеф-повар
					придумает идеальное блюдо.
				</p>
			</div>

			<button
				onClick={handleGenerateRecipe}
				disabled={loading}
				className="w-full py-4 bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-2xl shadow-md shadow-emerald-600/10 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed cursor-pointer text-center">
				{loading
					? "🔮 Наш шеф-повар изучает холодильник"
					: "🪄 Сгенерировать рецепт"}
			</button>
			{recipe && !loading && (
				<button
					onClick={handleResetRecipe}
					className="text-[11px] md:text-xs text-slate-400 hover:text-rose-500 self-center md:self-end transition-colors cursor-pointer mt-1 font-medium">
					🔄 Сбросить и придумать другое блюдо
				</button>
			)}

			{error && (
				<div className="p-4 bg-rose-50border border-rose-200 rounded-2xl text-sm text-rose-700 font-medium">
					{error}
				</div>
			)}
			{loading && <RecipeSkeleton />}
			{recipe && !loading && (
				<RecipeView recipe={recipe} onAddToShop={onAddToShop} />
			)}
		</div>
	);
}
