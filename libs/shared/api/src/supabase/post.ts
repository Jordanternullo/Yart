import { SupabaseRealtimeClient } from '@supabase/supabase-js/dist/module/lib/SupabaseRealtimeClient';
import { supabase } from './client';

export async function getPosts(category?: string) {
    try {
        let query = supabase
            .from('posts')
            .select(
                `id, categoryId!inner(title), title, user:authorId(name), likes(authorId), comments(authorId))`
            );
        if (category) {
            query = query.eq('categoryId.title', category);
        }
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

export async function createPosts(posts) {
    try {
        const { data, error } = await supabase
            .from('posts')
            .insert(posts, { upsert: true });
    } catch (error) {
        console.log(error);
    }
}

export async function getPostsInformation(username, idPost) {
    try {
        const query = supabase
            .from('posts')
            .select(
                `id, categoryId!inner(title), content, tags, title, file, createdAt, user:authorId(name), likes(authorId), comments(authorId))`
            )
            .eq('id', idPost)
            .eq('user.name', username);
        const { data, error } = await query;
        if (error) {
            throw error;
        }
        return data[0];
    } catch (error) {
        console.log(error);
    }
}

export async function changeLikePost(postId: string, userId: string) {
    try {
        const {data, error} = await supabase.from('likes').select(
            `id, authorId, postId`
        ).eq('authorId', userId).eq('postId', postId)

        if(error) {
            throw error
        }
        if(data.length > 0) {
            return removeLike(data[0].id)
        } else {
            return addLike({userId, postId})
        }
        
    } catch(error) {
        console.log(error)
    }
}

async function removeLike(id: string) {
    const {data, error} = await supabase.from('likes').delete().match({id: id})
    if(error) {
        throw error;
    }
    return data;
}

async function addLike(like: any) {
    const {data, error} = await supabase.from('likes').insert({
        authorId: like.userId,
        postId: like.postId
    }, { upsert: true })

    if(error) {
        throw error
    }

    return data;
}