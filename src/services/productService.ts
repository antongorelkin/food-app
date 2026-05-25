import { supabase } from "../utils/supabaseClient";
import { Product } from "../components/Fridge/ProductCard";


export const getProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('days_left', { ascending: false });

  if (error) throw error;

  return (data || []).map((item: any) => ({
    id: item.id,
    name: item.name,
    quantity: item.quantity,
    unit: item.unit,
    daysLeft: item.days_left,
    category: item.category || 'other'
  }));
}

export const addProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
  const { data, error } = await supabase
    .from('products')
    .insert([
      {
        name: product.name,
        quantity: product.quantity,
        unit: product.unit,
        days_left: product.daysLeft
      }
    ])
    .select()
    .single();
  if (error) throw error;
  return {
    id: data.id,
    name: data.name,
    quantity: data.quantity,
    unit: data.unit,
    daysLeft: data.days_left,
    category: data.category
  };
}

export const updateProductQuantity = async (id: string | number, quantity: number): Promise<void> => {
  const { error } = await supabase
    .from('products')
    .update({ quantity })
    .eq('id', id);

  if (error) throw error;
}

export const deleteProduct = async (id: string | number): Promise<void> => {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);
  if (error) throw error;
}