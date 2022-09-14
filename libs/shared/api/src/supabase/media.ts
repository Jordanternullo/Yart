import { supabase } from "./client";

export async function uploadImage(files: File[]) {
    try {
        const file = files[0]
          const fileExt = file.name.split('.').pop()
          const fileName = `${Math.random()}.${fileExt}`
          const filePath = `${fileName}`
    
        let { data, error } = await supabase.storage
        .from('images')
        .upload('posts/'+filePath, file, {cacheControl: '3600', upsert: false})
        
        if (error) {
            throw new Error('Error with supabase during upload image')
        }

        return data;
    } catch (error) {
        console.log(error.message)
    }


}
