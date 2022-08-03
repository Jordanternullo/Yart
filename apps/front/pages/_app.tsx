import { Button } from '@yart/shared/ui';
import axios from 'axios';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import './styles.scss';

function App({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const [authenticatedState, setAuthenticatedState] = useState(false);
    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange(
            (event, session) => {
                try {
                    handleAuthChange(event, session);
                } catch (error) {
                    console.log(error);
                }
                if (event === 'SIGNED_IN') {
                    setAuthenticatedState(true);
                    router.push('/');
                }
                if (event === 'SIGNED_OUT') {
                    setAuthenticatedState(false);
                }
            }
        );
        checkUser();
        return () => {
            authListener.unsubscribe();
        };
    });
    async function checkUser() {
        const user = await supabase.auth.user();
        if (user) {
            setAuthenticatedState(true);
        }
    }
    async function handleAuthChange(event, session) {
        const headers = {
            'Content-Type': 'application/json',
        };
        await axios.post(
            '/api/auth',
            { event, session },
            {
                headers,
            }
        );
    }
    async function signOut() {
        try {
            await supabase.auth.signOut();
            router.push('/');
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <>
            {authenticatedState && (
                <Button onClick={() => signOut()}>Deconnexion</Button>
            )}
            {!authenticatedState && <Button link="/signin">Connexion</Button>}
            <Component {...pageProps} />
        </>
    );
}

export default App;
