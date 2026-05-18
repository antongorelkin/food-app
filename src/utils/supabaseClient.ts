import { createClient } from '@supabase/supabase-js';

// Подтягиваем переменные через синтаксис Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Защитная проверка для TypeScript, чтобы сразу подсказать, если что-то не так
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Криcritical Error: Переменные окружения Supabase не найдены в .env.local");
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');
