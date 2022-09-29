import { supabase } from "./client";

export async function createCommentPost(comment: string, postId: number, authorId: number) {
    try {
        const {data, error} = await supabase
        .from('comments')
        .insert({
            comment, authorId, postId
        }, { upsert: true })
        if(error) {
            throw error;
        }
        return data[0];
    } catch (error) {
        console.log(error);
    }
}