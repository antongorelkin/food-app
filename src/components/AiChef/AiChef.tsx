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
}

export default function AiChef({ products }: AiChefProps) {
	const [recipe, setRecipe] = React.useState<Recipe | null>(null);
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState<string | null>(null);

	const handleGenerateRecipe = async () => {
		if (products.length === 0) {
			setError(
				"Ваш холодильник пуст! Пожалуйста, добавьте продукты, чтобы наш шеф-повар мог придумать рецепт.",
			);
			return;
		}
		setLoading(true);
		setRecipe(null);
		setError(null);

		try {
			const generatedRecipe = await fetchRecipeFromAi(products);
			setRecipe(generatedRecipe);
		} catch (err: any) {
			setError(
				"Произошла ошибка при генерации рецепта. Пожалуйста, попробуйте еще раз.",
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="w-full flex flex-col gap-6 max-w-2xl mx-auto">
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
				className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-2xl shadow-md shadow-emerald-600/10 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed cursor-pointer text-center">
				{loading
					? "🔮 Наш шеф-повар изучает холодильник"
					: "🪄 Сгенерировать рецепт"}
			</button>
			{error && (
				<div className="p-4 bg-rose-50border border-rose-200 rounded-2xl text-sm text-rose-700 font-medium">
					{error}
				</div>
			)}
			{loading && <RecipeSkeleton />}
			{recipe && !loading && <RecipeView recipe={recipe} />}
		</div>
	);
}
