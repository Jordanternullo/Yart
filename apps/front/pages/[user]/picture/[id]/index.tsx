import { Avatar, Button, Icon, Input } from '@yart/shared/ui';
import Layout from '../../../../components/layout';
import { useRouter } from 'next/router';

export default function Picture() {
    const router = useRouter();
    const user = router.query.user as string;
    const id = router.query.id as string;
    return (
        <Layout hiddenLeftBar={true}>
            <div className="flex justify-center float-left w-[calc(100%-320px)] h-[calc(100vh-200px)]">
                <img
                    src={`https://image-us.samsung.com/SamsungUS/home/audio/galaxy-buds/MB-04-JustWhatYouWantV4.jpg?$cm-g-fb-full-bleed-img-mobile-jpg$`}
                    className={`shadow-2xl`}
                />
            </div>
            <div className={`bg-dark-400 w-80 float-right h-full`}>
                <div className={`px-4 py-8`}>
                    <h3>Articles similaire de {user}</h3>
                    <div className={`grid grid-cols-3 gap-2 mt-2`}>
                        <img
                            src={`https://image-us.samsung.com/SamsungUS/home/audio/galaxy-buds/MB-04-JustWhatYouWantV4.jpg?$cm-g-fb-full-bleed-img-mobile-jpg$`}
                            className={`shadow-2xl`}
                        />
                        <img
                            src={`https://image-us.samsung.com/SamsungUS/home/audio/galaxy-buds/MB-04-JustWhatYouWantV4.jpg?$cm-g-fb-full-bleed-img-mobile-jpg$`}
                            className={`shadow-2xl`}
                        />
                        <img
                            src={`https://image-us.samsung.com/SamsungUS/home/audio/galaxy-buds/MB-04-JustWhatYouWantV4.jpg?$cm-g-fb-full-bleed-img-mobile-jpg$`}
                            className={`shadow-2xl`}
                        />
                    </div>
                </div>
                <div className={`px-4 py-8`}>
                    <h3>Articles suggérés</h3>
                    <div className={`grid grid-cols-3 gap-2 mt-2`}>
                        <img
                            src={`https://image-us.samsung.com/SamsungUS/home/audio/galaxy-buds/MB-04-JustWhatYouWantV4.jpg?$cm-g-fb-full-bleed-img-mobile-jpg$`}
                            className={`shadow-2xl`}
                        />
                        <img
                            src={`https://image-us.samsung.com/SamsungUS/home/audio/galaxy-buds/MB-04-JustWhatYouWantV4.jpg?$cm-g-fb-full-bleed-img-mobile-jpg$`}
                            className={`shadow-2xl`}
                        />
                        <img
                            src={`https://image-us.samsung.com/SamsungUS/home/audio/galaxy-buds/MB-04-JustWhatYouWantV4.jpg?$cm-g-fb-full-bleed-img-mobile-jpg$`}
                            className={`shadow-2xl`}
                        />
                    </div>
                </div>
            </div>
            <div
                className={`bg-dark-500 w-[calc(100%-320px)] float-left px-24 py-11`}>
                <div className={`flex justify-between`}>
                    <div className="flex gap-4">
                        <Avatar image="https://is4-ssl.mzstatic.com/image/thumb/aIvtSHOcgUL4ym2l6eQHPQ/1200x675mf.jpg" />
                        <div className="flex flex-col justify-center">
                            <span className={`font-title text-base`}>
                                Skypell
                            </span>
                            <span className="text-xs font-light">
                                Publié le 23 juillet 2022
                            </span>
                        </div>
                    </div>
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
                <div className={`flex gap-4 flex-wrap mt-7 mb-9`}>
                    <Button>Item 1</Button>
                    <Button>Item long 2</Button>
                    <Button>Item 3</Button>
                    <Button>Item 4</Button>
                    <Button>Item 5</Button>
                    <Button>Item 6</Button>
                    <Button>Item encore plus long 7</Button>
                    <Button>Item 8</Button>
                    <Button>Item 9</Button>
                    <Button>Item 10</Button>
                    <Button>Item 11</Button>
                    <Button>Item 12</Button>
                    <Button>Item 13</Button>
                    <Button>Item 14</Button>
                    <Button>Item 15</Button>
                    <Button>Item 16</Button>
                </div>
                <div>
                    <h2 className="font-title text-3xl mb-3">Titre du post</h2>
                    <p className="text-base font-light">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Duis ac sapien aliquam, efficitur nisl pulvinar, auctor
                        metus. Suspendisse rutrum nibh id ex pellentesque
                        cursus. Mauris bibendum tincidunt mauris quis mattis.
                        Nulla ut faucibus arcu. Maecenas rhoncus, velit non
                        auctor efficitur, eros quam suscipit dolor, nec pharetra
                        justo nisi et magna. Etiam a velit vel justo tristique
                        auctor. Maecenas tincidunt massa et turpis feugiat,
                        feugiat vehicula diam maximus. Duis in porta nisl, vitae
                        mollis nulla. `` Nullam nibh est, fermentum nec
                        efficitur eu, tincidunt ut turpis. Curabitur in dolor
                        mi. Quisque posuere egestas purus eget blandit.
                    </p>
                </div>
                <div>
                    <div
                        className={`w-2/3 m-auto flex items-center gap-4 p-4 rounded-md mb-5`}>
                        <Avatar image="https://is4-ssl.mzstatic.com/image/thumb/aIvtSHOcgUL4ym2l6eQHPQ/1200x675mf.jpg" />
                        <Input
                            containerClassName="w-full h-fit"
                            placeholder={'Laisser un commentaire'}
                        />
                    </div>
                    <div className={`w-2/3 m-auto p-4`}>
                        <div className={`flex gap-4 mb-4`}>
                            <Avatar image="https://is4-ssl.mzstatic.com/image/thumb/aIvtSHOcgUL4ym2l6eQHPQ/1200x675mf.jpg" />
                            <div>
                                <div
                                    className={`bg-dark-400 border-dark-300 rounded-md-4 border-2 px-4 py-2 rounded-md`}>
                                    <span className={`text-light-200 mr-2.5`}>
                                        Skypell
                                    </span>
                                    <span
                                        className={`text-light-500 text-[10px] font-light`}>
                                        Il y a 2 min
                                    </span>
                                    <p className={`font-light`}>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit. Duis ac sapien aliquam,
                                        efficitur nisl pulvinar, auctor metus.
                                        Suspendisse rutrum nibh id ex
                                        pellentesque cursus. Mauris bibendum
                                        tincidunt mauris quis mattis.
                                    </p>
                                </div>
                                <div className="flex gap-6 mt-2">
                                    <div
                                        className={`flex items-center space-x-2 hover:cursor-pointer`}>
                                        <Icon
                                            name={'thumb-up-line'}
                                            className={`text-base`}></Icon>
                                        <span className={`text-sm font-light`}>
                                            J'aime
                                        </span>
                                    </div>
                                    <div
                                        className={`flex items-center space-x-2 hover:cursor-pointer`}>
                                        <Icon
                                            name={'reply-line'}
                                            className={`text-base`}></Icon>
                                        <span className={`text-sm font-light`}>
                                            Répondre
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`flex gap-4 mb-4 ml-24`}>
                            <Avatar image="https://is4-ssl.mzstatic.com/image/thumb/aIvtSHOcgUL4ym2l6eQHPQ/1200x675mf.jpg" />
                            <div>
                                <div
                                    className={`bg-dark-400 border-dark-300 rounded-md-4 border-2 px-4 py-2 rounded-md`}>
                                    <span className={`text-light-200 mr-2.5`}>
                                        Skypell
                                    </span>
                                    <span
                                        className={`text-light-500 text-[10px] font-light`}>
                                        Il y a 2 min
                                    </span>
                                    <p className={`font-light`}>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit. Duis ac sapien aliquam,
                                        efficitur nisl pulvinar, auctor metus.
                                        Suspendisse rutrum nibh id ex
                                        pellentesque cursus. Mauris bibendum
                                        tincidunt mauris quis mattis.
                                    </p>
                                </div>
                                <div className="flex gap-6 mt-2">
                                    <div
                                        className={`flex items-center space-x-2 hover:cursor-pointer`}>
                                        <Icon
                                            name={'thumb-up-line'}
                                            className={`text-base`}></Icon>
                                        <span className={`text-sm font-light`}>
                                            J'aime
                                        </span>
                                    </div>
                                    <div
                                        className={`flex items-center space-x-2 hover:cursor-pointer`}>
                                        <Icon
                                            name={'reply-line'}
                                            className={`text-base`}></Icon>
                                        <span className={`text-sm font-light`}>
                                            Répondre
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`flex gap-4 mb-4 ml-24`}>
                            <Avatar image="https://is4-ssl.mzstatic.com/image/thumb/aIvtSHOcgUL4ym2l6eQHPQ/1200x675mf.jpg" />
                            <div>
                                <div
                                    className={`bg-dark-400 border-dark-300 rounded-md-4 border-2 px-4 py-2 rounded-md`}>
                                    <span className={`text-light-200 mr-2.5`}>
                                        Skypell
                                    </span>
                                    <span
                                        className={`text-light-500 text-[10px] font-light`}>
                                        Il y a 2 min
                                    </span>
                                    <p className={`font-light`}>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit. Duis ac sapien aliquam,
                                        efficitur nisl pulvinar, auctor metus.
                                        Suspendisse rutrum nibh id ex
                                        pellentesque cursus. Mauris bibendum
                                        tincidunt mauris quis mattis.
                                    </p>
                                </div>
                                <div className="flex gap-6 mt-2">
                                    <div
                                        className={`flex items-center space-x-2 hover:cursor-pointer`}>
                                        <Icon
                                            name={'thumb-up-line'}
                                            className={`text-base`}></Icon>
                                        <span className={`text-sm font-light`}>
                                            J'aime
                                        </span>
                                    </div>
                                    <div
                                        className={`flex items-center space-x-2 hover:cursor-pointer`}>
                                        <Icon
                                            name={'reply-line'}
                                            className={`text-base`}></Icon>
                                        <span className={`text-sm font-light`}>
                                            Répondre
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`w-2/3 m-auto p-4`}>
                        <div className={`flex gap-4 mb-4`}>
                            <Avatar image="https://is4-ssl.mzstatic.com/image/thumb/aIvtSHOcgUL4ym2l6eQHPQ/1200x675mf.jpg" />
                            <div>
                                <div
                                    className={`bg-dark-400 border-dark-300 rounded-md-4 border-2 px-4 py-2 rounded-md`}>
                                    <span className={`text-light-200 mr-2.5`}>
                                        Skypell
                                    </span>
                                    <span
                                        className={`text-light-500 text-[10px] font-light`}>
                                        Il y a 2 min
                                    </span>
                                    <p className={`font-light`}>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit. Duis ac sapien aliquam,
                                        efficitur nisl pulvinar, auctor metus.
                                        Suspendisse rutrum nibh id ex
                                        pellentesque cursus. Mauris bibendum
                                        tincidunt mauris quis mattis.
                                    </p>
                                </div>
                                <div className="flex gap-6 mt-2">
                                    <div
                                        className={`flex items-center space-x-2 hover:cursor-pointer`}>
                                        <Icon
                                            name={'thumb-up-line'}
                                            className={`text-base`}></Icon>
                                        <span className={`text-sm font-light`}>
                                            J'aime
                                        </span>
                                    </div>
                                    <div
                                        className={`flex items-center space-x-2 hover:cursor-pointer`}>
                                        <Icon
                                            name={'reply-line'}
                                            className={`text-base`}></Icon>
                                        <span className={`text-sm font-light`}>
                                            Répondre
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`flex gap-4 mb-4 ml-24`}>
                            <Avatar image="https://is4-ssl.mzstatic.com/image/thumb/aIvtSHOcgUL4ym2l6eQHPQ/1200x675mf.jpg" />
                            <div>
                                <div
                                    className={`bg-dark-400 border-dark-300 rounded-md-4 border-2 px-4 py-2 rounded-md`}>
                                    <span className={`text-light-200 mr-2.5`}>
                                        Skypell
                                    </span>
                                    <span
                                        className={`text-light-500 text-[10px] font-light`}>
                                        Il y a 2 min
                                    </span>
                                    <p className={`font-light`}>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit. Duis ac sapien aliquam,
                                        efficitur nisl pulvinar, auctor metus.
                                        Suspendisse rutrum nibh id ex
                                        pellentesque cursus. Mauris bibendum
                                        tincidunt mauris quis mattis.
                                    </p>
                                </div>
                                <div className="flex gap-6 mt-2">
                                    <div
                                        className={`flex items-center space-x-2 hover:cursor-pointer`}>
                                        <Icon
                                            name={'thumb-up-line'}
                                            className={`text-base`}></Icon>
                                        <span className={`text-sm font-light`}>
                                            J'aime
                                        </span>
                                    </div>
                                    <div
                                        className={`flex items-center space-x-2 hover:cursor-pointer`}>
                                        <Icon
                                            name={'reply-line'}
                                            className={`text-base`}></Icon>
                                        <span className={`text-sm font-light`}>
                                            Répondre
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
