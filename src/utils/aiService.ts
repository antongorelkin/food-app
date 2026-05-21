import { Recipe } from '../components/AiChef/RecipeView';
import { Product } from '../components/Fridge/ProductCard';


export const fetchRecipeFromAi = async (products: Product[]): Promise<Recipe> => {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error('Критическая ошибка: API ключ OpenRouter не найден в .env.local');
  }

  const ingredientsList = products.map(p => `${p.name} (${p.quantity}${p.unit})`).join(', ');

  const prompt = `У меня есть следующие продукты в холодильнике: ${ingredientsList}. 
  Придумай из них ОДНО простое, интересное бытовое блюдо. Ты можешь использовать базовые специи, соль или воду по умолчанию.
  
  Ответ верни СТРОГО в формате валидного JSON-объекта на русском языке, без какого-либо лишнего текста, Markdown разметки вроде "\`\`\`json" или комментариев до и после объекта.
  
  Структура JSON должна быть ТОЧНО такой:
  {
  "title":"Понятное и аппетитное название блюда",
  "time":"Время приготовления в минутах (например: 30 минут)",
  "steps":[
  "Шаг 1. Описание...",
  "Шаг 2. Описание...",
],
  "missing":[
  "Ингредиент 1, которого не хватает, но он очень нужен (если всё есть, оставь массив пустым)",
  "Ингредиент 2"
  ]
  }`;

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": window.location.origin,
      "X-Title": "Smart Fridge App"
    },
    body: JSON.stringify({
      model: "openrouter/free",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    })
  });

  if (!response.ok) {
    throw new Error(`Ошибка сервера OpenRouter: ${response.status}`);
  }

  const data = await response.json();

  let aiTextResponse = data.choices?.[0]?.message?.content?.trim();

  if (aiTextResponse.startsWith('```')) {
    aiTextResponse = aiTextResponse.replace(/^```json\s*|```$/g, '');
  }

  const parsedRecipe: Recipe = JSON.parse(aiTextResponse);

  return parsedRecipe;
}