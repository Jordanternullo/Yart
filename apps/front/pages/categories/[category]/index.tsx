import { Skeleton } from '@mui/material';
import { getCategoriesBySlug, getPosts } from '@yart/shared/api';
import { Card } from '@yart/shared/ui';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../../../components/layout';

export default function Index() {
    const router = useRouter();
    const categoryTitleSlug = router.query.category as string;
    const [category, setCategory] = useState({} as any);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        getCategoriesBySlug(categoryTitleSlug)
            .then((category) => {
                setCategory(category);
                getPosts(category.title).then((posts) => {
                    setPosts(posts);
                });
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
            <div className={`px-2 sm:px-12 py-8 flex`}>
                <h2
                    className={`uppercase text-3xl font-title after:content-[''] after:block after:w-1/2 after:h-[2px] after:bg-primary-500 after:m-auto`}>
                    {category?.title}
                </h2>
            </div>
            <div className={`px-2 sm:px-12`}>
                <div
                    className={`grid grid-cols-1 sm:grid-cols-5 2xl:grid-cols-6 gap-0.5`}>
                    {loading
                        ? [...Array(10)].map((index) => {
                              return (
                                  <Skeleton
                                      key={index}
                                      variant="rectangular"
                                      width={253}
                                      height={256}
                                  />
                              );
                          })
                        : posts.map((item, index) => {
                              console.log(item);
                              return (
                                  <div
                                      key={index}
                                      className={`h-[256px] w-full`}>
                                      <Link
                                          href={`/${item.user.name}/picture/${item.id}`}>
                                          <Card
                                              post={item}
                                              className={`h-full min-h-[0px] min-w-[0px]`}
                                              showInfo={true}
                                          />
                                      </Link>
                                  </div>
                              );
                          })}
                </div>
            </div>
        </Layout>
    );
}
