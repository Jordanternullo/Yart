import { useRouter } from 'next/router';

export default function Post() {
    const router = useRouter();
    const user = router.query.user as string;
    const id = router.query.id as string;
    return <div>post</div>;
}
