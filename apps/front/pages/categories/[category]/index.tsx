import { getCategoriesBySlug } from '@yart/shared/api';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../../../components/layout';

export default function Index() {
    const router = useRouter();
    const categoryTitleSlug = router.query.category as string;
    const [category, setCategory] = useState({} as any);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        getCategoriesBySlug(categoryTitleSlug)
            .then((category) => {
                setCategory(category);
                console.log(category);
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
                {loading ? (
                    <p>loading ..</p>
                ) : (
                    <h2
                        className={`uppercase text-3xl font-title after:content-[''] after:block after:w-1/2 after:h-[2px] after:bg-primary-500 after:m-auto`}>
                        {category?.title}
                    </h2>
                )}
            </div>
        </Layout>
    );
}
