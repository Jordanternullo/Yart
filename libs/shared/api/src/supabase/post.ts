import { SupabaseRealtimeClient } from '@supabase/supabase-js/dist/module/lib/SupabaseRealtimeClient';
import slugify from 'react-slugify';
import { supabase } from './client';

export async function getPosts(category?: string, tag?: string) {
    try {
        let query = supabase
            .from('posts')
            .select(
                `id, categoryId!inner(title), title, tags, file, user:authorId(name), likes(authorId), comments(authorId))`
            );
        if (category) {
            query = query.eq('categoryId.title', category);
        }
        if(tag) {
            query = supabase.rpc('get_posts_by_tag', {tag: tag}).select(
                `id, categoryId!inner(title), title, tags, file, user:authorId(name), likes(authorId), comments(authorId))`
            );
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

export async function getPostsByUser(user: string, postExclude?, elementCount?: number) {
    try {
        let query = supabase
        .from('posts')
        .select(
            `id, categoryId!inner(title), title, tags, file, user:authorId(name), likes(authorId), comments(authorId))`
        ).eq('user.name', user)
        let { data, error } = await query;
        if (postExclude) {
            data = data.filter((item) => item.id !== postExclude.id);

            data?.map((item) => {
                item.relevanceIndex = item.tags.filter(tag => postExclude.tags.map(data => data.text.toLowerCase()).indexOf(tag.text.toLowerCase()) !== -1).length
            })
            data?.sort((current,next) => next.relevanceIndex - current.relevanceIndex)
        }
        
        if (error) {
            throw error;
        }
        if(elementCount) {
            return data?.filter((item) => item.relevanceIndex > 0).slice(0, elementCount);
        }
        return data;
    } catch (error) {
        console.log(error);
    }

    
}

export async function getPostsByTags(user, postExclude, elementCount?: number) {
    try {
        let query = supabase
        .from('posts')
        .select(
            `id, categoryId!inner(title), title, tags, file, user:authorId(name), likes(authorId), comments(authorId))`
        )
        let { data, error } = await query;
        if (data) {
            data = data.filter((item) => item.id !== postExclude.id);

            data?.map((item) => {
                item.relevanceIndex = item.tags.filter(tag => postExclude.tags.map(data => data.text.toLowerCase()).indexOf(tag.text.toLowerCase()) !== -1).length
            })
            data?.sort((current,next) => next.relevanceIndex - current.relevanceIndex)

        }
        
        if (error) {
            throw error;
        }
        if(elementCount) {
            return data?.filter((item) => item.relevanceIndex > 0 && item.user.name !== user).slice(0, elementCount);
        }
        return data?.filter((item) => item.relevanceIndex > 0 && item.user.name !== user);
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