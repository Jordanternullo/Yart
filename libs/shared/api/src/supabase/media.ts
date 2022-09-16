import { supabase } from './client';

export async function uploadImage(files: File[]) {
    const test = [];
    try {
        for (const file of files) {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;
            console.log(filePath);
            const { data, error } = await supabase.storage
                .from('images')
                .upload('posts/' + filePath, file, {
                    cacheControl: '3600',
                    upsert: false,
                });
            if (error) {
                throw new Error('Error with supabase during upload image');
            }

            if (data) {
                test.push(data.Key);
            }
        }
        return test;
    } catch (error) {
        console.log(error.message);
    }
}
