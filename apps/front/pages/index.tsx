import { Avatar, Card, Icon, Input, Toggle } from '@yart/shared/ui';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Skeleton } from '@mui/material';
import { getPosts } from '@yart/shared/api';
import Layout from '../components/layout';

export function Index() {
    const [postsImage, setPostsImage] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toogle, setToogle] = useState<boolean>(false);
    const handleViewType = () => {
        setToogle(!toogle);
    };

    useEffect(() => {
        setLoading(true);
        getPosts()
            .then((posts) => {
                setPostsImage(posts);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <Layout>
            <div className={`px-2 sm:px-12 py-8 flex justify-between`}>
                <h2
                    className={`uppercase text-3xl font-title after:content-[''] after:block after:w-1/2 after:h-[2px] after:bg-primary-500 after:m-auto`}>
                    Homepage
                </h2>
                <div>
                    <span className={`pr-2`}>Images</span>
                    <Toggle onChange={handleViewType}></Toggle>
                    <span className={`pl-2`}>Post</span>
                </div>
            </div>
            <div className={`px-2 sm:px-12`}>
                {!toogle && (
                    <div
                        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 2xl:grid-cols-6 gap-0.5`}>
                        {loading
                            ? [...Array(10)].map((value, index) => {
                                  return (
                                      <Skeleton
                                          key={index}
                                          variant="rectangular"
                                          width={253}
                                          height={256}
                                      />
                                  );
                              })
                            : postsImage?.map((item, index) => {
                                  return (
                                      <div key={index} className={`h-[256px]`}>
                                          <Link
                                              href={`/${item.user.name}/picture/${item.id}`}>
                                              <Card
                                                  post={item}
                                                  className={`h-full min-h-[0px] min-w-[0px]`}
                                                  onClickLike={() => console.log('click like')}
                                                  onClickComment={() => console.log('click comment')}
                                              />
                                          </Link>
                                      </div>
                                  );
                              })}
                    </div>
                )}
                {toogle && (
                    <div className={`sm:w-2/4 sm:mx-auto sm:my-0`}>
                        <div
                            className={`w-full bg-dark-400 flex items-center gap-4 p-4 rounded-md mb-5`}>
                            <Avatar image="https://is4-ssl.mzstatic.com/image/thumb/aIvtSHOcgUL4ym2l6eQHPQ/1200x675mf.jpg" />
                            <Input
                                containerClassName="w-full h-fit"
                                placeholder={'Quoi de neuf, Skypell ?'}
                            />
                        </div>
                        <div className={`w-full bg-dark-400 p-4 rounded-md`}>
                            <div className="flex gap-4">
                                <Avatar image="https://is4-ssl.mzstatic.com/image/thumb/aIvtSHOcgUL4ym2l6eQHPQ/1200x675mf.jpg" />
                                <div className="flex flex-col justify-center">
                                    <span className={`font-title text-base`}>
                                        Skypell
                                    </span>
                                    <span className="text-xs">
                                        Il y a 5 min
                                    </span>
                                </div>
                            </div>
                            <div className="mt-4">
                                <h2 className="font-title text-3xl mb-3">
                                    Title why many word
                                </h2>
                                <p className="text-base font-normal	">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Duis ac sapien aliquam,
                                    efficitur nisl pulvinar, auctor metus.
                                    Suspendisse rutrum nibh id ex pellentesque
                                    cursus. Mauris bibendum tincidunt mauris
                                    quis mattis. Nulla ut faucibus arcu.
                                    Maecenas rhoncus, velit non auctor
                                    efficitur, eros quam suscipit dolor, nec
                                    pharetra justo nisi et magna. Etiam a velit
                                    vel justo tristique auctor. Maecenas
                                    tincidunt massa et turpis feugiat, feugiat
                                    vehicula diam maximus. Duis in porta nisl,
                                    vitae mollis nulla. `` Nullam nibh est,
                                    fermentum nec efficitur eu, tincidunt ut
                                    turpis. Curabitur in dolor mi. Quisque
                                    posuere egestas purus eget blandit.
                                </p>
                            </div>
                            <div className="flex justify-between mt-3">
                                <span className="font-bold hover:cursor-pointer">
                                    Voir plus
                                </span>
                                <div className="flex gap-4">
                                    <div
                                        className={`flex items-center space-x-1 hover:cursor-pointer`}>
                                        <span className={`text-base`}>28</span>
                                        <Icon
                                            name={'thumb-up-line'}
                                            className={`text-2xl`}></Icon>
                                    </div>
                                    <div
                                        className={`flex items-center space-x-1 hover:cursor-pointer`}>
                                        <span className={`text-base`}>13</span>
                                        <Icon
                                            name={'chat-3-line'}
                                            className={`text-2xl`}></Icon>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between border-primary-500 border-solid border-y py-2.5 my-4">
                                <div className="flex items-center gap-2 hover:cursor-pointer">
                                    <Icon
                                        name={'thumb-up-line'}
                                        className="text-2xl"
                                    />
                                    <span>J'aime</span>
                                </div>
                                <div className="flex items-center gap-2 hover:cursor-pointer">
                                    <Icon
                                        name={'chat-3-line'}
                                        className="text-2xl"
                                    />
                                    <span>Réagir</span>
                                </div>
                                <div className="flex items-center gap-2 hover:cursor-pointer">
                                    <Icon
                                        name={'share-forward-line'}
                                        className="text-2xl"
                                    />
                                    <span>Partager</span>
                                </div>
                            </div>
                            <div
                                className={`w-full flex items-center gap-4 p-4`}>
                                <Avatar image="https://is4-ssl.mzstatic.com/image/thumb/aIvtSHOcgUL4ym2l6eQHPQ/1200x675mf.jpg" />
                                <Input
                                    containerClassName="w-full h-fit"
                                    placeholder={'Quoi de neuf, Skypell ?'}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}

export default Index;
