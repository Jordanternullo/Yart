import { Avatar, Button, Icon, Input, TextEditor } from '@yart/shared/ui';
import Layout from '../../../../components/layout';
import Router, { useRouter } from 'next/router';
import { KeyboardEvent, useEffect, useState } from 'react';
import { changeLikePost, getPostsByTags, getPostsByUser, getPostsInformation, supabase, createCommentPost } from '@yart/shared/api';
import { format } from 'date-fns';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import Link from 'next/link';
import { timeSince } from 'apps/front/utils/utils';

export default function Index() {
    const router = useRouter();
    const user = router.query.user as string;
    const id = router.query.id as string;

    const [post, setPost] = useState<any>();
    const [similarPost, setSimilarPost] = useState([]);
    const [suggestPost, setSuggestPost] = useState([]);
    const [loading, setLoading] = useState(false);
    const [likeState, setLikeState] = useState(false);
    const [likes, setLikes] = useState(0);
    const stateLikeButtonClassName = likeState ? 'text-primary-500' : '';
    useEffect(() => {
        setLoading(true);
        getPostsInformation(user, id)
            .then((post) => {
                if (post?.length === 0) {
                    Router.push('/');
                }
                setPost(post);
                setLikes(post.likes.length)
                if(post.likes.filter((authorId) => authorId !== supabase.auth.user().id).length > 0) {
                    setLikeState(true);
                }
                getPostsByUser(user, post, 6).then((posts) => {
                    setSimilarPost(posts)
                })
                getPostsByTags(user, post, 6).then((posts) => {
                    setSuggestPost(posts)
                })
                setLoading(false);
            })
            .finally(() => setLoading(false));
    }, [ id, user]);
    

    const likePost = () => {
        setLikeState(!likeState)
        setLikes(likeState ? likes-1 : likes+1)
        changeLikePost(post.id, supabase.auth.user().id).then(data => {
        }).catch(error => {
            setLikes(likeState ? likes-1 : likes+1)
            setLikeState(!likeState)
        })
    }

    const handleKeyUp = (e: KeyboardEvent<HTMLImageElement>) => {
        if(e.key === 'Enter') {
            addCommentToPost();
        }
    }

    const addCommentToPost = () => {
        createCommentPost('test', post.id, supabase.auth.user().id).then((data) => {
            if(post) {
                post.comments.push(data)
                setPost(post)
            }
        })
    }
    
    return (
        <Layout hiddenLeftBar={true}>
            <div className="flex justify-center float-left w-[calc(100%-320px)] h-[calc(100vh-200px)]">
            { !loading && post &&
                <Carousel
                    animation="fade" navButtonsAlwaysVisible autoPlay={false}
                    className='w-full h-full carousel'
                >
                    {post.file.map((img, index) => (
                        <Paper key={index} elevation={10} style={{ height: '100%' }} className="flex justify-center items-center !bg-transparent">
                            <img
                                src={`https://llizjdazuugceeynocci.supabase.co/storage/v1/object/public/${img}`}
                                className={`shadow-2xl max-h-full`}
                            />
                        </Paper>
                    )
                    )}
                </Carousel>
            }
            </div>
            <div className={`bg-dark-400 w-80 float-right h-full`}>
                <div className={`px-4 py-8`}>
                    <h3>Articles similaire de {user}</h3>
                    <div className={`grid grid-cols-3 gap-2 mt-2`}>
                        {similarPost.map((post, index) => {
                            return (
                                <Link key={index} href={`/${user}/picture/${post.id}`}>
                                    <img
                                        src={`https://llizjdazuugceeynocci.supabase.co/storage/v1/object/public/${post.file[0]}`}
                                        className={`shadow-2xl hover:cursor-pointer`}
                                    />
                                </Link>
                            )}
                        ) 
                        }
                    </div>
                </div>
                <div className={`px-4 py-8`}>
                    <h3>Articles suggérés</h3>
                    <div className={`grid grid-cols-3 gap-2 mt-2`}>
                        {suggestPost.map((post, index) => {
                            return (
                                <Link key={index} href={`/${post.user.name}/picture/${post.id}`}>
                                    <img
                                        src={`https://llizjdazuugceeynocci.supabase.co/storage/v1/object/public/${post.file[0]}`}
                                        className={`shadow-2xl hover:cursor-pointer`}
                                    />
                                </Link>
                            )}
                        ) 
                        }
                    </div>
                </div>
            </div>
            {!loading && post && (
                <div
                    className={`bg-dark-500 w-[calc(100%-320px)] float-left px-24 py-11`}>
                    <div className={`flex justify-between`}>
                        <div className="flex gap-4">
                            <Avatar image="https://is4-ssl.mzstatic.com/image/thumb/aIvtSHOcgUL4ym2l6eQHPQ/1200x675mf.jpg" />
                            <div className="flex flex-col justify-center">
                                <span className={`font-title text-base`}>
                                    {post.user.name}
                                </span>
                                <span className="text-xs font-light">
                                    Publié le{' '}
                                    {format(
                                        new Date(post.createdAt),
                                        'd MMMM yyyy'
                                    )}
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div
                                className={`flex items-center space-x-1 hover:cursor-pointer`}
                                onClick={() => likePost()}>
                                <span className={`text-base`}>{likes}</span>
                                <Icon
                                    name={
                                        likeState
                                            ? 'thumb-up-fill'
                                            : 'thumb-up-line'
                                    }
                                    className={`text-2xl ${stateLikeButtonClassName}`}></Icon>
                            </div>
                            <div
                                className={`flex items-center space-x-1 hover:cursor-pointer`}>
                                <span className={`text-base`}>{post.comments.length}</span>
                                <Icon
                                    name={'chat-3-line'}
                                    className={`text-2xl`}></Icon>
                            </div>
                        </div>
                    </div>
                    <div className={`flex gap-4 flex-wrap mt-7 mb-9`}>
                        {post.tags?.map((item, index) => {
                            return (
                                <Link key={index} href={`/tags/${item.id}`}>
                                    <Button >
                                        {item.text}
                                    </Button>
                                </Link>
                            );
                        })}
                    </div>
                    <div>
                        <h2 className="font-title text-3xl mb-3">
                            {post.title}
                        </h2>
                        <p
                            className="text-base font-light"
                            dangerouslySetInnerHTML={{
                                __html: post.content,
                            }}></p>
                    </div>
                    <div>
                        <div
                            className={`w-2/3 m-auto flex items-center gap-4 p-4 rounded-md mb-5`}>
                            <Avatar image="https://is4-ssl.mzstatic.com/image/thumb/aIvtSHOcgUL4ym2l6eQHPQ/1200x675mf.jpg" />
                            <Input
                                containerClassName="w-full h-fit"
                                placeholder={'Laisser un commentaire'}
                                onKeyUp={handleKeyUp}
                            />
                        </div>
                        <div className={`w-2/3 m-auto p-4`}>
                            {post.comments.map((comment, index) => {
                                return (
                                    <div className={`flex gap-4 mb-4`} key={index}>
                                        <Avatar image="https://is4-ssl.mzstatic.com/image/thumb/aIvtSHOcgUL4ym2l6eQHPQ/1200x675mf.jpg" />
                                        <div>
                                            <div
                                                className={`bg-dark-400 border-dark-300 rounded-md-4 border-2 px-4 py-2 rounded-md`}>
                                                <span
                                                    className={`text-light-200 mr-2.5`}>
                                                    {comment.user.name}
                                                </span>
                                                <span
                                                    className={`text-light-500 text-[10px] font-light`}>
                                                        Il y a {timeSince(new Date(comment.createdAt))}
                                                </span>
                                                <p className={`font-light`}>
                                                    {comment.comment}
                                                </p>
                                            </div>
                                            <div className="flex gap-6 mt-2">
                                                <div
                                                    className={`flex items-center space-x-2 hover:cursor-pointer`}>
                                                    <Icon
                                                        name={'thumb-up-line'}
                                                        className={`text-base`}></Icon>
                                                    <span
                                                        className={`text-sm font-light`}>
                                                        J'aime
                                                    </span>
                                                </div>
                                                <div
                                                    className={`flex items-center space-x-2 hover:cursor-pointer`}>
                                                    <Icon
                                                        name={'reply-line'}
                                                        className={`text-base`}></Icon>
                                                    <span
                                                        className={`text-sm font-light`}>
                                                        Répondre
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>      
                                )
                            })}
                            
                            <div className={`flex gap-4 mb-4 ml-24`}>
                                <Avatar image="https://is4-ssl.mzstatic.com/image/thumb/aIvtSHOcgUL4ym2l6eQHPQ/1200x675mf.jpg" />
                                <div>
                                    <div
                                        className={`bg-dark-400 border-dark-300 rounded-md-4 border-2 px-4 py-2 rounded-md`}>
                                        <span
                                            className={`text-light-200 mr-2.5`}>
                                            Skypell
                                        </span>
                                        <span
                                            className={`text-light-500 text-[10px] font-light`}>
                                            Il y a 2 min
                                        </span>
                                        <p className={`font-light`}>
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipiscing elit. Duis ac
                                            sapien aliquam, efficitur nisl
                                            pulvinar, auctor metus. Suspendisse
                                            rutrum nibh id ex pellentesque
                                            cursus. Mauris bibendum tincidunt
                                            mauris quis mattis.
                                        </p>
                                    </div>
                                    <div className="flex gap-6 mt-2">
                                        <div
                                            className={`flex items-center space-x-2 hover:cursor-pointer`}>
                                            <Icon
                                                name={'thumb-up-line'}
                                                className={`text-base`}></Icon>
                                            <span
                                                className={`text-sm font-light`}>
                                                J'aime
                                            </span>
                                        </div>
                                        <div
                                            className={`flex items-center space-x-2 hover:cursor-pointer`}>
                                            <Icon
                                                name={'reply-line'}
                                                className={`text-base`}></Icon>
                                            <span
                                                className={`text-sm font-light`}>
                                                Répondre
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
}
