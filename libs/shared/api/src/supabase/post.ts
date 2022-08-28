import { supabase } from './client';

export async function getPosts() {
    try {
        const query = supabase
            .from('posts')
            .select(
                `title, user:authorId(name), likes(authorId), comments(authorId))`
            );
        const { data, error } = await query;
        if (data) {
            data.map((item) => {
                item.likes = {
                    count: item.likes.length,
                    active: item.likes.some(
                        (like: { authorId: string }) =>
                            like.authorId === supabase.auth.user()?.id
                    ),
                };
                item.comments = {
                    count: item.comments.length,
                    active: item.comments.some(
                        (comment: { authorId: string }) =>
                            comment.authorId === supabase.auth.user()?.id
                    ),
                };
            });
        }
        if (error) {
            throw error;
        }
        return data;
    } catch (error) {
        console.log(error);
    }
}
