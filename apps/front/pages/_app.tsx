import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.scss';

function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Welcome to front!</title>
            </Head>
            <main className="app">
                <Component {...pageProps} />
            </main>
        </>
    );
}

export default App;
