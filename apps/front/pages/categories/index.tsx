import { Card } from '@yart/shared/ui';
import Layout from '../../components/layout';
import { supabase } from '../../utils/supabaseClient';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Skeleton } from '@mui/material';

export default function Index() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getCategories();
    }, []);
    const getCategories = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('categories')
                .select('*');
            setCategories(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <Layout>
            <div className={`px-2 sm:px-12 py-8 flex`}>
                <h2
                    className={`uppercase text-3xl font-title after:content-[''] after:block after:w-1/2 after:h-[2px] after:bg-primary-500 after:m-auto`}>
                    Catégories
                </h2>
            </div>
            <div className={`px-2 sm:px-12`}>
                <div
                    className={`grid grid-cols-1 sm:grid-cols-5 2xl:grid-cols-6 gap-0.5`}>
                    {loading
                        ? [...Array(5)].map((index) => {
                              return (
                                  <Skeleton
                                      key={index}
                                      variant="rectangular"
                                      width={253}
                                      height={256}
                                  />
                              );
                          })
                        : categories.map((item, index) => {
                              return (
                                  <div
                                      key={index}
                                      className={`h-[256px] w-full`}>
                                      <Link href="/category/warhammer">
                                          <Card
                                              post={{ title: item.name }}
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
