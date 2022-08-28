import slugify from 'react-slugify';
import { supabase } from './client';

export async function getCategories() {
    try {
        const { data, error } = await supabase.from('categories').select('*');
        if (error) {
            throw error;
        }
        return data;
    } catch (error) {
        console.log(error);
    }
}

export async function getCategoriesBySlug(titleSlug: string) {
    try {
        const { data, error } = await supabase
            .from('categories')
            .select('*, title');
        if (error) {
            throw error;
        }
        return data?.find((item) => slugify(item.title) === titleSlug);
    } catch (error) {
        console.log(error);
    }
}
