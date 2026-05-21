import React from "react";
import { Sparkles, Clock, ListOrdered, ShoppingCart } from "lucide-react";

interface Recipe {
	title: string;
	time: string;
	steps: string[];
	missing: string[];
}

export default function AiChef() {
	const [recipe, setRecipe] = React.useState<Recipe | null>(null);
	const [loading, setLoading] = React.useState(false);

	const handleGenerateRecipe = () => {
		setLoading(true);
		setRecipe(null);

		setTimeout(() => {
			setRecipe({
				title: "Сливочное куриное филе с тофу",
				time: "30 минут",
				steps: [
					"Нарежьте куриное филе и сыр тофу кубиками одинакового размера.",
					"Обжарьте курицу на сковороде с каплей масла до золотистой корочки (примерно 7 минут).",
					"Добавьте тофу, залейте сметаной/сливками и тушите на медленном огне еще 10 минут.",
					"Посолите по вкусу и украсьте зеленью перед подачей.",
				],
				missing: ["Сливки 20%", "Свежая зелень"],
			});
			setLoading(false);
		}, 2000);
	};

  return (
    <div className="w-full flex flex-col gap-6 max-w-2xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-emerald-600" /> ИИ-Шеф Повар
        </h2>
        <p className="text-sm text-slate-500 mt-1">
           Умный шеф-повар проанализирует ваш холодильник и придумает идеальное блюдо.
        </p>
      </div>

      <button 
      onClick={handleGenerateRecipe}
      disabled={loading}
      className='w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-2xl shadow-md shadow-emerald-600/10 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed cursor-pointer text-center'>
   {    loading ? "🔮 Наш шеф-повар изучает холодильник" : "🪄 Сгенерировать рецепт"}
      </button>
    </div>
  )
}
