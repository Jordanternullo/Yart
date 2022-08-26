import { Card } from '@yart/shared/ui';
import Layout from 'apps/front/components/layout';
import Link from 'next/link';

export default function Index() {
    const mock = [
        {
            width: 206,
            height: 300,
        },
        {
            width: 145,
            height: 300,
        },
        {
            width: 198,
            height: 300,
        },
        {
            width: 172,
            height: 300,
        },
        {
            width: 417,
            height: 300,
        },
        {
            width: 459,
            height: 300,
        },
        {
            width: 193,
            height: 300,
        },
        {
            width: 238,
            height: 300,
        },
        {
            width: 300,
            height: 300,
        },
        {
            width: 150,
            height: 300,
        },
        {
            width: 200,
            height: 300,
        },
    ];
    const card = {
        title: 'TEST',
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
                    {mock.map((item, index) => {
                        return (
                            <div key={index} className={`h-[256px] w-full`}>
                                <Link href="/category/warhammer">
                                    <Card
                                        post={card}
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
